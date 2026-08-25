export type UserRole = 'customer' | 'driver' | 'business';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  created_at: string;
  avatar?: string;
  company_name?: string;
  gstin?: string;
  kyc_status: 'verified' | 'pending' | 'unverified';
  rating: number;
  completed_trips: number;
  wallet_balance: number;
}

export type VehicleCategory = 'auto' | 'mini_truck' | 'lorry' | 'container';

export interface Vehicle {
  id: string;
  driver_id: string;
  driver_name: string;
  driver_phone: string;
  vehicle_type: VehicleCategory;
  vehicle_name: string;
  vehicle_number: string;
  capacity_kg: number;
  current_location: string;
  is_verified: boolean;
  is_available: boolean;
  rate_per_km: number;
  image_url?: string;
  rc_number?: string;
  insurance_expiry?: string;
}

export type LoadStatus = 'posted' | 'matched' | 'in_transit' | 'delivered' | 'cancelled';

export interface Load {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  pickup_location: string;
  destination: string;
  load_type: 'household' | 'business_cargo' | 'agricultural' | 'construction' | 'electronics' | 'industrial';
  weight_kg: number;
  vehicle_type: VehicleCategory;
  status: LoadStatus;
  fare: number;
  distance_km: number;
  created_at: string;
  pickup_date: string;
  is_return_load?: boolean;
  notes?: string;
  goods_value?: number;
  has_insurance?: boolean;
}

export type BookingStatus = 'confirmed' | 'driver_assigned' | 'loading' | 'in_transit' | 'arrived' | 'delivered';

export interface Booking {
  id: string;
  load_id: string;
  load?: Load;
  vehicle_id: string;
  vehicle?: Vehicle;
  driver_id: string;
  driver_name: string;
  customer_id: string;
  status: BookingStatus;
  booking_date: string;
  pickup_location: string;
  destination: string;
  fare: number;
  forward_fare: number;
  return_discount?: number;
  otp: string;
  delivery_proof_notes?: string;
  estimated_arrival?: string;
}

export interface TrackingPoint {
  id: string;
  booking_id: string;
  latitude: number;
  longitude: number;
  current_location_name: string;
  speed_kmh: number;
  status: BookingStatus;
  updated_at: string;
  eta_hours: number;
  progress_percent: number;
  corridor_name: string;
  next_waypoint: string;
}

export interface ReturnLoad {
  id: string;
  vehicle_id: string;
  driver_id: string;
  driver_name: string;
  vehicle_type: VehicleCategory;
  original_booking_id: string;
  pickup_location: string;
  destination: string;
  fare: number;
  normal_fare: number;
  savings_percent: number;
  status: 'available' | 'matched' | 'confirmed' | 'completed';
  available_date: string;
  matched_load_id?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'match' | 'payout' | 'alert';
  time: string;
  read: boolean;
  action_link?: string;
}

export interface CorridorInfo {
  id: string;
  name: string;
  fromCity: string;
  toCity: string;
  distanceKm: number;
  avgDurationHours: number;
  activeVehicles: number;
  returnLoadSuccessRate: number;
  baseFareEstimated: number;
}
