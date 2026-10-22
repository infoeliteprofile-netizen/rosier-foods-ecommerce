declare module 'lucide-react' {
  import React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }

  export type LucideIcon = React.FC<LucideProps>;

  export const ShoppingBag: LucideIcon;
  export const Search: LucideIcon;
  export const User: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const Sparkles: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const FileText: LucideIcon;
  export const Star: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const Trash2: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Tag: LucideIcon;
  export const Mail: LucideIcon;
  export const Phone: LucideIcon;
  export const MapPin: LucideIcon;
  export const Clock: LucideIcon;
  export const Instagram: LucideIcon;
  export const Facebook: LucideIcon;
  export const Youtube: LucideIcon;
  export const Eye: LucideIcon;
  export const Gift: LucideIcon;
  export const Lock: LucideIcon;
  export const CreditCard: LucideIcon;
  export const Banknote: LucideIcon;
  export const QrCode: LucideIcon;
  export const Truck: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Share2: LucideIcon;
  export const Heart: LucideIcon;
  export const Award: LucideIcon;
  export const Leaf: LucideIcon;
  export const Flame: LucideIcon;
  export const Quote: LucideIcon;
  export const Filter: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Users: LucideIcon;
  export const Package: LucideIcon;
  export const LogOut: LucideIcon;
  export const Download: LucideIcon;
}
