import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User, Vehicle, Load, Booking, TrackingPoint, ReturnLoad, NotificationItem, CorridorInfo } from '../types';

// Fallback configuration
const DEFAULT_SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://mock-loadlink-project.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'mock-anon-key-loadlink';

let supabaseClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    const customUrl = localStorage.getItem('loadlink_supabase_url') || DEFAULT_SUPABASE_URL;
    const customKey = localStorage.getItem('loadlink_supabase_key') || DEFAULT_SUPABASE_ANON_KEY;
    try {
      supabaseClient = createClient(customUrl, customKey);
    } catch {
      supabaseClient = createClient('https://mock-loadlink-project.supabase.co', 'mock-anon-key-loadlink');
    }
  }
  return supabaseClient;
};

// Initial Seed Data
export const INITIAL_USERS: User[] = [
  {
    id: 'user_cust_1',
    name: 'Saikishan (Sai)',
    email: 'saikishan@loadlink.app',
    phone: '+91 98490 12345',
    role: 'customer',
    created_at: '2025-01-15T09:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company_name: 'Sai Tech & Agro Supplies',
    kyc_status: 'verified',
    rating: 4.9,
    completed_trips: 18,
    wallet_balance: 14500,
  },
  {
    id: 'user_drv_1',
    name: 'Ramesh Kumar',
    email: 'ramesh.trucker@gmail.com',
    phone: '+91 98765 43210',
    role: 'driver',
    created_at: '2024-11-20T14:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    kyc_status: 'verified',
    rating: 4.85,
    completed_trips: 142,
    wallet_balance: 28400,
  },
  {
    id: 'user_drv_2',
    name: 'Venkatesh Rao',
    email: 'venkat.tempo@gmail.com',
    phone: '+91 94401 88762',
    role: 'driver',
    created_at: '2024-12-05T10:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    kyc_status: 'verified',
    rating: 4.92,
    completed_trips: 98,
    wallet_balance: 19200,
  },
  {
    id: 'user_biz_1',
    name: 'Priya Sharma',
    email: 'logistics@deccanfmcg.com',
    phone: '+91 91234 56789',
    role: 'business',
    created_at: '2024-10-10T11:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    company_name: 'Deccan FMCG & Industrial Logistics',
    gstin: '36AABCD1234F1Z5',
    kyc_status: 'verified',
    rating: 4.95,
    completed_trips: 340,
    wallet_balance: 85000,
  },
];

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh_1',
    driver_id: 'user_drv_1',
    driver_name: 'Ramesh Kumar',
    driver_phone: '+91 98765 43210',
    vehicle_type: 'lorry',
    vehicle_name: 'Ashok Leyland Ecomet 1214',
    vehicle_number: 'TS 09 UA 8842',
    capacity_kg: 8500,
    current_location: 'Bengaluru (Peenya Industrial Area)',
    is_verified: true,
    is_available: true,
    rate_per_km: 42,
    rc_number: 'RC-TS09-8842-2022',
    insurance_expiry: '2026-11-30',
    image_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'veh_2',
    driver_id: 'user_drv_2',
    driver_name: 'Venkatesh Rao',
    driver_phone: '+91 94401 88762',
    vehicle_type: 'mini_truck',
    vehicle_name: 'Tata Ace Gold Diesel (Chota Hathi)',
    vehicle_number: 'AP 16 TZ 4519',
    capacity_kg: 1000,
    current_location: 'Hyderabad (Kukatpally)',
    is_verified: true,
    is_available: true,
    rate_per_km: 22,
    rc_number: 'RC-AP16-4519-2023',
    insurance_expiry: '2026-08-15',
    image_url: 'https://images.unsplash.com/photo-1586191582056-a6078351fb36?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'veh_3',
    driver_id: 'user_drv_3',
    driver_name: 'Mohammed Imran',
    driver_phone: '+91 97011 22334',
    vehicle_type: 'auto',
    vehicle_name: 'Piaggio Ape Extra Load Auto',
    vehicle_number: 'TS 07 ED 9912',
    capacity_kg: 500,
    current_location: 'Hyderabad (Begumpet)',
    is_verified: true,
    is_available: true,
    rate_per_km: 15,
    rc_number: 'RC-TS07-9912-2023',
    insurance_expiry: '2026-09-20',
    image_url: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'veh_4',
    driver_id: 'user_drv_4',
    driver_name: 'Gurpreet Singh',
    driver_phone: '+91 99887 66554',
    vehicle_type: 'container',
    vehicle_name: 'BharatBenz 3528C Heavy Multi-Axle',
    vehicle_number: 'KA 01 AF 7731',
    capacity_kg: 24000,
    current_location: 'Vijayawada (Autonagar)',
    is_verified: true,
    is_available: true,
    rate_per_km: 68,
    rc_number: 'RC-KA01-7731-2021',
    insurance_expiry: '2026-10-10',
    image_url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&auto=format&fit=crop&q=80',
  }
];

export const INITIAL_LOADS: Load[] = [
  {
    id: 'load_101',
    customer_id: 'user_cust_1',
    customer_name: 'Saikishan (Sai)',
    customer_phone: '+91 98490 12345',
    pickup_location: 'Hyderabad, Telangana (Gachibowli Logistic Hub)',
    destination: 'Bengaluru, Karnataka (Whitefield Tech Zone)',
    load_type: 'electronics',
    weight_kg: 3200,
    vehicle_type: 'lorry',
    status: 'in_transit',
    fare: 22400,
    distance_km: 565,
    pickup_date: '2026-08-25',
    created_at: '2026-08-24T18:20:00Z',
    notes: 'Fragile server racks and solar inverter assemblies. Handle with care.',
    goods_value: 450000,
    has_insurance: true,
  },
  {
    id: 'load_102',
    customer_id: 'user_biz_1',
    customer_name: 'Deccan FMCG',
    customer_phone: '+91 91234 56789',
    pickup_location: 'Bengaluru, Karnataka (Peenya 2nd Stage)',
    destination: 'Hyderabad, Telangana (Secunderabad Wholesale Mart)',
    load_type: 'business_cargo',
    weight_kg: 4800,
    vehicle_type: 'lorry',
    status: 'posted',
    fare: 15800, // Return-load special discounted fare!
    distance_km: 565,
    pickup_date: '2026-08-26',
    created_at: '2026-08-25T01:45:00Z',
    is_return_load: true,
    notes: 'Packaged organic dry fruits and beverage cartons. Ready for immediate loading on return vehicle.',
    goods_value: 280000,
    has_insurance: true,
  },
  {
    id: 'load_103',
    customer_id: 'user_cust_1',
    customer_name: 'Saikishan (Sai)',
    customer_phone: '+91 98490 12345',
    pickup_location: 'Hyderabad (Kondapur)',
    destination: 'Vijayawada, AP (Benz Circle)',
    load_type: 'household',
    weight_kg: 850,
    vehicle_type: 'mini_truck',
    status: 'posted',
    fare: 7200,
    distance_km: 275,
    pickup_date: '2026-08-27',
    created_at: '2026-08-25T02:10:00Z',
    notes: 'Complete 2BHK furniture, refrigerator, and 30 packaged moving boxes.',
    goods_value: 120000,
    has_insurance: true,
  },
  {
    id: 'load_104',
    customer_id: 'user_biz_1',
    customer_name: 'Priya Sharma (Deccan FMCG)',
    customer_phone: '+91 91234 56789',
    pickup_location: 'Vijayawada (Autonagar Hub)',
    destination: 'Hyderabad (Sanathnagar Industrial Estate)',
    load_type: 'agricultural',
    weight_kg: 7800,
    vehicle_type: 'lorry',
    status: 'posted',
    fare: 10500, // Return load discount
    distance_km: 275,
    pickup_date: '2026-08-27',
    created_at: '2026-08-25T03:00:00Z',
    is_return_load: true,
    notes: 'Fresh farm produce and commercial packaging containers.',
    goods_value: 350000,
    has_insurance: true,
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book_201',
    load_id: 'load_101',
    load: INITIAL_LOADS[0],
    vehicle_id: 'veh_1',
    vehicle: INITIAL_VEHICLES[0],
    driver_id: 'user_drv_1',
    driver_name: 'Ramesh Kumar',
    customer_id: 'user_cust_1',
    status: 'in_transit',
    booking_date: '2026-08-24T19:00:00Z',
    pickup_location: 'Hyderabad, Telangana (Gachibowli Logistic Hub)',
    destination: 'Bengaluru, Karnataka (Whitefield Tech Zone)',
    fare: 22400,
    forward_fare: 22400,
    otp: '4892',
    delivery_proof_notes: 'Loading verified with tamper-proof security seals attached.',
    estimated_arrival: 'Today at 5:30 PM (NH44 Corridor)',
  }
];

export const INITIAL_TRACKING: TrackingPoint = {
  id: 'trk_301',
  booking_id: 'book_201',
  latitude: 14.6819, // Near Anantapur on NH44
  longitude: 77.6006,
  current_location_name: 'NH44 Highway near Anantapur Bypass (AP/KA Corridor)',
  speed_kmh: 62,
  status: 'in_transit',
  updated_at: 'Just now (Real-time GPS)',
  eta_hours: 3.5,
  progress_percent: 68,
  corridor_name: 'Hyderabad → Bengaluru (NH44 Express Corridor)',
  next_waypoint: 'Chikkaballapur Toll Plaza (ETA 2 hrs 10 mins)',
};

export const INITIAL_RETURN_LOADS: ReturnLoad[] = [
  {
    id: 'ret_401',
    vehicle_id: 'veh_1',
    driver_id: 'user_drv_1',
    driver_name: 'Ramesh Kumar',
    vehicle_type: 'lorry',
    original_booking_id: 'book_201',
    pickup_location: 'Bengaluru, Karnataka (Peenya / Hosur / Whitefield)',
    destination: 'Hyderabad, Telangana',
    fare: 15800,
    normal_fare: 23500,
    savings_percent: 33,
    status: 'available',
    available_date: '2026-08-26 (Tomorrow Morning)',
    matched_load_id: 'load_102',
  },
  {
    id: 'ret_402',
    vehicle_id: 'veh_4',
    driver_id: 'user_drv_4',
    driver_name: 'Gurpreet Singh',
    vehicle_type: 'container',
    original_booking_id: 'book_202',
    pickup_location: 'Vijayawada, AP (Autonagar / Guntur)',
    destination: 'Hyderabad, Telangana',
    fare: 18500,
    normal_fare: 29000,
    savings_percent: 36,
    status: 'available',
    available_date: '2026-08-27 (Evening Slot)',
  }
];

export const CORRIDORS_DATA: CorridorInfo[] = [
  {
    id: 'hyd-blr',
    name: 'Hyderabad ↔ Bengaluru',
    fromCity: 'Hyderabad',
    toCity: 'Bengaluru',
    distanceKm: 565,
    avgDurationHours: 10.5,
    activeVehicles: 84,
    returnLoadSuccessRate: 94.2,
    baseFareEstimated: 18500,
  },
  {
    id: 'hyd-vja',
    name: 'Hyderabad ↔ Vijayawada',
    fromCity: 'Hyderabad',
    toCity: 'Vijayawada',
    distanceKm: 275,
    avgDurationHours: 5.5,
    activeVehicles: 112,
    returnLoadSuccessRate: 91.8,
    baseFareEstimated: 8500,
  },
  {
    id: 'blr-chn',
    name: 'Bengaluru ↔ Chennai',
    fromCity: 'Bengaluru',
    toCity: 'Chennai',
    distanceKm: 345,
    avgDurationHours: 6.8,
    activeVehicles: 96,
    returnLoadSuccessRate: 96.0,
    baseFareEstimated: 11200,
  },
  {
    id: 'pun-mum',
    name: 'Pune ↔ Mumbai',
    fromCity: 'Pune',
    toCity: 'Mumbai',
    distanceKm: 150,
    avgDurationHours: 3.5,
    activeVehicles: 145,
    returnLoadSuccessRate: 97.5,
    baseFareEstimated: 5800,
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Return-Load Match Available!',
    message: 'A reverse load from Bengaluru to Hyderabad (4,800 kg FMCG goods) matches your lorry arriving tomorrow morning.',
    type: 'match',
    time: '5 mins ago',
    read: false,
    action_link: '/dashboard?tab=return_loads',
  },
  {
    id: 'notif_2',
    title: 'Trip In-Transit Milestone',
    message: 'Vehicle TS 09 UA 8842 crossed Anantapur Bypass. Current ETA to Whitefield: 3h 30m.',
    type: 'booking',
    time: '25 mins ago',
    read: false,
    action_link: '/dashboard?tab=tracking',
  },
  {
    id: 'notif_3',
    title: 'KYC Document Verified',
    message: 'Commercial Driving License and National Permit documents have been approved by LoadLink Trust Desk.',
    type: 'alert',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 'notif_4',
    title: 'Payout Released into Wallet',
    message: 'Escrow release of ₹22,400 confirmed for delivered shipment #LD-8821.',
    type: 'payout',
    time: 'Yesterday',
    read: true,
  }
];

// Supabase PostgreSQL Schema SQL DDL for easy export & viewing
export const SUPABASE_SQL_SCHEMA = `-- =========================================================
-- LoadLink PostgreSQL Database Schema for Supabase
-- Core Architecture: Users -> Loads -> Bookings -> Vehicles/Drivers -> Tracking
-- Unique Innovation: Completed Journey -> Return-Load Matching -> New Booking
-- =========================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'driver', 'business')),
  avatar_url TEXT,
  company_name TEXT,
  gstin TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('verified', 'pending', 'unverified')),
  rating NUMERIC(3, 2) DEFAULT 5.00,
  completed_trips INTEGER DEFAULT 0,
  wallet_balance NUMERIC(12, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('auto', 'mini_truck', 'lorry', 'container')),
  vehicle_name TEXT NOT NULL,
  vehicle_number TEXT UNIQUE NOT NULL,
  capacity_kg NUMERIC(10, 2) NOT NULL,
  current_location TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  rate_per_km NUMERIC(8, 2) NOT NULL,
  rc_number TEXT,
  insurance_expiry DATE,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. LOADS TABLE
CREATE TABLE IF NOT EXISTS public.loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  load_type TEXT NOT NULL,
  weight_kg NUMERIC(10, 2) NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('auto', 'mini_truck', 'lorry', 'container')),
  status TEXT DEFAULT 'posted' CHECK (status IN ('posted', 'matched', 'in_transit', 'delivered', 'cancelled')),
  fare NUMERIC(10, 2) NOT NULL,
  distance_km NUMERIC(8, 2) NOT NULL,
  pickup_date DATE NOT NULL,
  is_return_load BOOLEAN DEFAULT false,
  notes TEXT,
  goods_value NUMERIC(12, 2),
  has_insurance BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id UUID REFERENCES public.loads(id) ON DELETE RESTRICT NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE RESTRICT NOT NULL,
  driver_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  customer_id UUID REFERENCES public.users(id) ON DELETE RESTRICT NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'driver_assigned', 'loading', 'in_transit', 'arrived', 'delivered')),
  booking_date TIMESTAMPTZ DEFAULT now() NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  fare NUMERIC(10, 2) NOT NULL,
  forward_fare NUMERIC(10, 2) NOT NULL,
  return_discount NUMERIC(10, 2) DEFAULT 0.00,
  otp VARCHAR(6) NOT NULL,
  delivery_proof_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. TRACKING TABLE
CREATE TABLE IF NOT EXISTS public.tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  current_location_name TEXT,
  speed_kmh NUMERIC(5, 2) DEFAULT 0.00,
  status TEXT NOT NULL,
  corridor_name TEXT,
  progress_percent INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. RETURN_LOADS TABLE (Core LoadLink Innovation)
CREATE TABLE IF NOT EXISTS public.return_loads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  original_booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  fare NUMERIC(10, 2) NOT NULL,
  normal_fare NUMERIC(10, 2) NOT NULL,
  savings_percent NUMERIC(5, 2) DEFAULT 30.00,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'matched', 'confirmed', 'completed')),
  available_date DATE NOT NULL,
  matched_load_id UUID REFERENCES public.loads(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.return_loads ENABLE ROW LEVEL SECURITY;

-- RLS Policies Examples
CREATE POLICY "Public profiles are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view available vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Drivers can manage their vehicles" ON public.vehicles FOR ALL USING (auth.uid() = driver_id);

CREATE POLICY "Loads are viewable by all authenticated users" ON public.loads FOR SELECT USING (true);
CREATE POLICY "Customers can create loads" ON public.loads FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Bookings viewable by parties involved" ON public.bookings FOR SELECT USING (
  auth.uid() = customer_id OR auth.uid() = driver_id
);
`;
