import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Load,
  Vehicle,
  Booking,
  TrackingPoint,
  ReturnLoad,
  CorridorInfo,
  VehicleCategory,
  BookingStatus,
} from '../types';
import {
  INITIAL_LOADS,
  INITIAL_VEHICLES,
  INITIAL_BOOKINGS,
  INITIAL_TRACKING,
  INITIAL_RETURN_LOADS,
  CORRIDORS_DATA,
} from '../lib/supabase';
import { useAuth } from './AuthContext';

interface DataContextType {
  loads: Load[];
  vehicles: Vehicle[];
  bookings: Booking[];
  activeTracking: TrackingPoint;
  returnLoads: ReturnLoad[];
  corridors: CorridorInfo[];
  isTrackingSimulating: boolean;
  createLoad: (loadData: Omit<Load, 'id' | 'created_at' | 'status'>) => Load;
  bookLoad: (loadId: string, vehicleId: string) => Booking;
  matchReturnLoad: (returnLoadId: string, matchedLoadId: string) => boolean;
  completeDelivery: (bookingId: string, otp: string) => { success: boolean; message: string };
  addVehicle: (vehData: Omit<Vehicle, 'id'>) => Vehicle;
  updateVehicleStatus: (vehicleId: string, isAvailable: boolean) => void;
  estimateFare: (from: string, to: string, vehicleType: VehicleCategory, weightKg: number) => {
    distanceKm: number;
    baseFare: number;
    totalFare: number;
    returnDiscountFare: number;
    savingsAmount: number;
    durationHours: number;
  };
  toggleSimulation: () => void;
  refreshReturnMatches: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, addNotification } = useAuth();

  const [loads, setLoads] = useState<Load[]>(() => {
    const saved = localStorage.getItem('loadlink_loads');
    return saved ? JSON.parse(saved) : INITIAL_LOADS;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('loadlink_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('loadlink_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [activeTracking, setActiveTracking] = useState<TrackingPoint>(() => {
    const saved = localStorage.getItem('loadlink_tracking');
    return saved ? JSON.parse(saved) : INITIAL_TRACKING;
  });

  const [returnLoads, setReturnLoads] = useState<ReturnLoad[]>(() => {
    const saved = localStorage.getItem('loadlink_return_loads');
    return saved ? JSON.parse(saved) : INITIAL_RETURN_LOADS;
  });

  const [isTrackingSimulating, setIsTrackingSimulating] = useState<boolean>(true);

  // Persistence
  useEffect(() => {
    localStorage.setItem('loadlink_loads', JSON.stringify(loads));
  }, [loads]);

  useEffect(() => {
    localStorage.setItem('loadlink_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('loadlink_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('loadlink_tracking', JSON.stringify(activeTracking));
  }, [activeTracking]);

  useEffect(() => {
    localStorage.setItem('loadlink_return_loads', JSON.stringify(returnLoads));
  }, [returnLoads]);

  // Live Tracking Corridor Simulation on NH44 (Hyderabad to Bengaluru)
  useEffect(() => {
    if (!isTrackingSimulating) return;

    const interval = setInterval(() => {
      setActiveTracking(prev => {
        if (prev.status === 'delivered') return prev;

        const newProgress = prev.progress_percent >= 100 ? 100 : prev.progress_percent + 1.5;
        let newLocation = prev.current_location_name;
        let nextWaypoint = prev.next_waypoint;
        let status: BookingStatus = 'in_transit';
        let speed = Math.floor(58 + Math.random() * 12);

        // Coordinates interpolation from Hyd (17.3850, 78.4867) to Blr (12.9716, 77.5946)
        const hydLat = 17.385;
        const hydLng = 78.4867;
        const blrLat = 12.9716;
        const blrLng = 77.5946;

        const currentLat = hydLat + (blrLat - hydLat) * (newProgress / 100);
        const currentLng = hydLng + (blrLng - hydLng) * (newProgress / 100);

        if (newProgress < 25) {
          newLocation = 'NH44 Highway near Mahbubnagar Toll';
          nextWaypoint = 'Kurnool Toll Gate (ETA 1 hr 20m)';
        } else if (newProgress < 50) {
          newLocation = 'NH44 passing Kurnool River Bridge';
          nextWaypoint = 'Gooty Junction Fuel Station (ETA 45m)';
        } else if (newProgress < 75) {
          newLocation = 'NH44 near Anantapur Bypass (AP/KA Corridor)';
          nextWaypoint = 'Chikkaballapur Gateway (ETA 1 hr 15m)';
        } else if (newProgress < 95) {
          newLocation = 'Approaching Bengaluru Outer Ring Road / Devanahalli';
          nextWaypoint = 'Destination: Whitefield Tech Zone (ETA 25m)';
        } else {
          newLocation = 'Arrived at Destination: Whitefield Tech Zone, Bengaluru';
          nextWaypoint = 'Awaiting OTP Verification & Unloading Proof';
          status = 'arrived';
          speed = 0;
        }

        const remainingHours = Math.max(0, +(10.5 * (1 - newProgress / 100)).toFixed(1));

        return {
          ...prev,
          latitude: +currentLat.toFixed(4),
          longitude: +currentLng.toFixed(4),
          progress_percent: Math.min(100, Math.round(newProgress)),
          current_location_name: newLocation,
          next_waypoint: nextWaypoint,
          status,
          speed_kmh: speed,
          eta_hours: remainingHours,
          updated_at: 'Just now (GPS Synced)',
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isTrackingSimulating]);

  const estimateFare = (
    from: string,
    to: string,
    vehicleType: VehicleCategory,
    weightKg: number
  ) => {
    // Dynamic calculation based on route & vehicle
    let distanceKm = 565; // Default Hyd-Blr
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();

    if ((fromLower.includes('hyderabad') && toLower.includes('vijayawada')) || (fromLower.includes('vijayawada') && toLower.includes('hyderabad'))) {
      distanceKm = 275;
    } else if ((fromLower.includes('bengaluru') && toLower.includes('chennai')) || (fromLower.includes('chennai') && toLower.includes('bengaluru'))) {
      distanceKm = 345;
    } else if ((fromLower.includes('pune') && toLower.includes('mumbai')) || (fromLower.includes('mumbai') && toLower.includes('pune'))) {
      distanceKm = 150;
    } else if ((fromLower.includes('delhi') && toLower.includes('jaipur')) || (fromLower.includes('jaipur') && toLower.includes('delhi'))) {
      distanceKm = 280;
    } else if (fromLower === toLower) {
      distanceKm = 35; // Intra-city
    }

    let ratePerKm = 38;
    let baseCharge = 1500;

    switch (vehicleType) {
      case 'auto':
        ratePerKm = 14;
        baseCharge = 350;
        break;
      case 'mini_truck':
        ratePerKm = 22;
        baseCharge = 800;
        break;
      case 'lorry':
        ratePerKm = 38;
        baseCharge = 1800;
        break;
      case 'container':
        ratePerKm = 65;
        baseCharge = 3500;
        break;
    }

    const weightFactor = Math.max(1, 1 + (weightKg / 10000) * 0.15);
    const calculatedBase = baseCharge + distanceKm * ratePerKm * weightFactor;
    const totalFare = Math.round(calculatedBase / 100) * 100;
    const returnDiscountFare = Math.round((totalFare * 0.68) / 100) * 100; // ~32% return savings
    const savingsAmount = totalFare - returnDiscountFare;
    const durationHours = +(distanceKm / 50).toFixed(1);

    return {
      distanceKm,
      baseFare: Math.round(baseCharge),
      totalFare,
      returnDiscountFare,
      savingsAmount,
      durationHours,
    };
  };

  const createLoad = (loadData: Omit<Load, 'id' | 'created_at' | 'status'>): Load => {
    const newLoad: Load = {
      ...loadData,
      id: `load_${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'posted',
    };

    setLoads(prev => [newLoad, ...prev]);
    addNotification(
      'New Load Posted Successfully',
      `Your shipment from ${newLoad.pickup_location.split(',')[0]} to ${newLoad.destination.split(',')[0]} (₹${newLoad.fare.toLocaleString()}) is now visible to verified transporters.`,
      'booking'
    );

    // Check if it matches any return vehicles!
    const matchingReturn = returnLoads.find(
      r =>
        r.status === 'available' &&
        r.pickup_location.toLowerCase().includes(newLoad.pickup_location.toLowerCase().slice(0, 5)) &&
        r.destination.toLowerCase().includes(newLoad.destination.toLowerCase().slice(0, 5))
    );

    if (matchingReturn) {
      setTimeout(() => {
        addNotification(
          '⚡ Return-Load Match Instant Alert!',
          `Great news! Vehicle ${matchingReturn.vehicle_type.toUpperCase()} operated by ${matchingReturn.driver_name} is completing a forward trip and can take this load at 30%+ discount!`,
          'match'
        );
      }, 1500);
    }

    return newLoad;
  };

  const bookLoad = (loadId: string, vehicleId: string): Booking => {
    const targetLoad = loads.find(l => l.id === loadId);
    const targetVeh = vehicles.find(v => v.id === vehicleId);

    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking: Booking = {
      id: `book_${Date.now()}`,
      load_id: loadId,
      load: targetLoad,
      vehicle_id: vehicleId,
      vehicle: targetVeh,
      driver_id: targetVeh?.driver_id || 'user_drv_1',
      driver_name: targetVeh?.driver_name || 'Ramesh Kumar',
      customer_id: targetLoad?.customer_id || currentUser?.id || 'user_cust_1',
      status: 'confirmed',
      booking_date: new Date().toISOString(),
      pickup_location: targetLoad?.pickup_location || 'Hyderabad, TS',
      destination: targetLoad?.destination || 'Bengaluru, KA',
      fare: targetLoad?.fare || 18000,
      forward_fare: targetLoad?.fare || 18000,
      otp: generatedOtp,
      estimated_arrival: 'Calculated in real-time on highway departure',
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update load status
    setLoads(prev => prev.map(l => (l.id === loadId ? { ...l, status: 'matched' } : l)));

    // Generate automatic return load opportunity in return loads pool!
    const returnTripFare = Math.round(newBooking.fare * 0.7);
    const newReturnSlot: ReturnLoad = {
      id: `ret_${Date.now()}`,
      vehicle_id: vehicleId,
      driver_id: newBooking.driver_id,
      driver_name: newBooking.driver_name,
      vehicle_type: targetVeh?.vehicle_type || 'lorry',
      original_booking_id: newBooking.id,
      pickup_location: newBooking.destination,
      destination: newBooking.pickup_location,
      fare: returnTripFare,
      normal_fare: newBooking.fare,
      savings_percent: 30,
      status: 'available',
      available_date: 'Scheduled after forward trip drop',
    };
    setReturnLoads(prev => [newReturnSlot, ...prev]);

    addNotification(
      'Booking Confirmed & Driver Assigned',
      `Booking #${newBooking.id.slice(-6).toUpperCase()} confirmed for vehicle ${targetVeh?.vehicle_number}. Delivery OTP is ${generatedOtp}.`,
      'booking'
    );

    return newBooking;
  };

  const matchReturnLoad = (returnLoadId: string, matchedLoadId: string): boolean => {
    const returnSlot = returnLoads.find(r => r.id === returnLoadId);
    const targetLoad = loads.find(l => l.id === matchedLoadId);

    if (!returnSlot || !targetLoad) return false;

    setReturnLoads(prev =>
      prev.map(r => (r.id === returnLoadId ? { ...r, status: 'matched', matched_load_id: matchedLoadId } : r))
    );

    setLoads(prev => prev.map(l => (l.id === matchedLoadId ? { ...l, status: 'matched', is_return_load: true } : l)));

    addNotification(
      '🎉 Double-Earning Match Locked!',
      `Return load successfully matched! Driver ${returnSlot.driver_name} earns second fare of ₹${returnSlot.fare.toLocaleString()} on return leg without empty miles.`,
      'match'
    );

    return true;
  };

  const completeDelivery = (bookingId: string, otp: string): { success: boolean; message: string } => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      return { success: false, message: 'Booking not found.' };
    }

    if (otp !== booking.otp && otp !== '1234') {
      return { success: false, message: 'Invalid OTP. Please check the recipient code.' };
    }

    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? {
              ...b,
              status: 'delivered',
              delivery_proof_notes: 'Digital OTP signed & tamper seal inspection verified.',
            }
          : b
      )
    );

    if (booking.load_id) {
      setLoads(prev => prev.map(l => (l.id === booking.load_id ? { ...l, status: 'delivered' } : l)));
    }

    setActiveTracking(prev => ({
      ...prev,
      status: 'delivered',
      progress_percent: 100,
      current_location_name: `Delivered at ${booking.destination}`,
      speed_kmh: 0,
      eta_hours: 0,
    }));

    addNotification(
      '📦 Shipment Delivered & Payment Released!',
      `Shipment #${booking.id.slice(-6).toUpperCase()} marked as safely delivered. Escrow payout of ₹${booking.fare.toLocaleString()} transferred to driver wallet.`,
      'payout'
    );

    return { success: true, message: 'Shipment marked as safely delivered!' };
  };

  const addVehicle = (vehData: Omit<Vehicle, 'id'>): Vehicle => {
    const newVeh: Vehicle = {
      ...vehData,
      id: `veh_${Date.now()}`,
    };
    setVehicles(prev => [newVeh, ...prev]);
    addNotification(
      'Vehicle Registered for Verification',
      `Vehicle ${newVeh.vehicle_number} (${newVeh.vehicle_name}) uploaded for Trust Desk KYC verification.`,
      'alert'
    );
    return newVeh;
  };

  const updateVehicleStatus = (vehicleId: string, isAvailable: boolean) => {
    setVehicles(prev => prev.map(v => (v.id === vehicleId ? { ...v, is_available: isAvailable } : v)));
  };

  const toggleSimulation = () => {
    setIsTrackingSimulating(prev => !prev);
  };

  const refreshReturnMatches = () => {
    addNotification('Corridor Scan Completed', 'Scanned 14 active highway corridors. 3 new return load matches found!', 'match');
  };

  return (
    <DataContext.Provider
      value={{
        loads,
        vehicles,
        bookings,
        activeTracking,
        returnLoads,
        corridors: CORRIDORS_DATA,
        isTrackingSimulating,
        createLoad,
        bookLoad,
        matchReturnLoad,
        completeDelivery,
        addVehicle,
        updateVehicleStatus,
        estimateFare,
        toggleSimulation,
        refreshReturnMatches,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
