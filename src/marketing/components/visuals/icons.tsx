/**
 * Icons for the feature scenes: Hugeicons (stroke rounded, the free set),
 * drawn bare at 1.6px so they read like a real product UI, plus the real
 * brand marks from Simple Icons in their own colours. Exported under the
 * names the scenes use. `strokeWidth` is accepted for compatibility and
 * ignored, so every icon in a scene shares one weight.
 */
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  Activity01Icon,
  ArrowLeft01Icon,
  Mic01Icon,
  TickDouble02Icon,
  Video01Icon,
  Alert02Icon,
  ArrowTurnBackwardIcon,
  BookOpen01Icon,
  Calendar03Icon,
  CallIcon,
  ChartIncreaseIcon,
  ChartLineData01Icon,
  CheckmarkBadge01Icon,
  Clock01Icon,
  ClothesIcon,
  CodeIcon,
  Copy01Icon,
  CreditCardIcon,
  CrownIcon,
  CubeIcon,
  Cursor01Icon,
  CursorPointer01Icon,
  CustomerSupportIcon,
  DashboardSpeed01Icon,
  DeliveryBox01Icon,
  DeliveryTruck01Icon,
  Download04Icon,
  Exchange01Icon,
  File01Icon,
  FilterHorizontalIcon,
  FingerPrintIcon,
  FlashIcon,
  FlaskConicalIcon,
  Folder01Icon,
  GiftIcon,
  GitBranchIcon,
  HierarchyIcon,
  Home01Icon,
  InboxIcon,
  IndianRupeeIcon,
  Invoice01Icon,
  Key01Icon,
  Layers01Icon,
  LayoutTable01Icon,
  LeftToRightListBulletIcon,
  Link01Icon,
  LinkSquare02Icon,
  Logout01Icon,
  Mail01Icon,
  Megaphone01Icon,
  Message01Icon,
  MessageMultiple01Icon,
  Money01Icon,
  PauseIcon,
  PercentIcon,
  PlayIcon,
  PlusSignIcon,
  QrCodeIcon,
  RefreshIcon,
  Robot01Icon,
  Route01Icon,
  ScrollIcon,
  Search01Icon,
  SentIcon,
  ShieldCheckIcon,
  ShieldUserIcon,
  ShoppingBag01Icon,
  ShoppingCart01Icon,
  SmartWatch01Icon,
  Sorting05Icon,
  SourceCodeIcon,
  SparklesIcon,
  SquareLock02Icon,
  Store01Icon,
  Tag01Icon,
  Target01Icon,
  Tick02Icon,
  Touch01Icon,
  UserAdd01Icon,
  UserCheck01Icon,
  UserGroupIcon,
  UserIcon,
  ViewIcon,
  Wallet01Icon,
  WebhookIcon,
  FlowConnectionIcon,
} from '@hugeicons/core-free-icons';
import type { IconType as RIcon } from 'react-icons';
import {
  SiAnthropic,
  SiGooglegemini,
  SiMeta,
  SiOpenai,
  SiRazorpay,
  SiShopify,
  SiWhatsapp,
} from 'react-icons/si';

export type SceneIconProps = { strokeWidth?: number; className?: string };

const STROKE = 1.6;

const huge = (icon: IconSvgElement) => {
  function SceneIcon({ className }: SceneIconProps) {
    return (
      <HugeiconsIcon
        icon={icon}
        size="1em"
        strokeWidth={STROKE}
        className={className ? `fv-hi ${className}` : 'fv-hi'}
        aria-hidden
      />
    );
  }
  return SceneIcon;
};

const brand = (I: RIcon, name: string) => {
  function BrandIcon({ className }: SceneIconProps) {
    const cls = `fv-brand fv-brand--${name}`;
    return <I className={className ? `${cls} ${className}` : cls} aria-hidden />;
  }
  return BrandIcon;
};

export const Activity = huge(Activity01Icon);
export const ArrowDownWideNarrow = huge(Sorting05Icon);
export const BadgeCheck = huge(CheckmarkBadge01Icon);
export const BookOpen = huge(BookOpen01Icon);
export const Bot = huge(Robot01Icon);
export const Boxes = huge(CubeIcon);
export const Braces = huge(CodeIcon);
export const CalendarDays = huge(Calendar03Icon);
export const Check = huge(Tick02Icon);
export const Clock = huge(Clock01Icon);
export const Code2 = huge(SourceCodeIcon);
export const Copy = huge(Copy01Icon);
export const CreditCard = huge(CreditCardIcon);
export const Crown = huge(CrownIcon);
export const Download = huge(Download04Icon);
export const ExternalLink = huge(LinkSquare02Icon);
export const Eye = huge(ViewIcon);
export const FileText = huge(File01Icon);
export const Filter = huge(FilterHorizontalIcon);
export const Fingerprint = huge(FingerPrintIcon);
export const FlaskConical = huge(FlaskConicalIcon);
export const Folder = huge(Folder01Icon);
export const Footprints = huge(Route01Icon);
export const Gauge = huge(DashboardSpeed01Icon);
export const Gift = huge(GiftIcon);
export const GitBranch = huge(GitBranchIcon);
export const Hand = huge(Touch01Icon);
export const Headphones = huge(CustomerSupportIcon);
export const Home = huge(Home01Icon);
export const Inbox = huge(InboxIcon);
export const IndianRupee = huge(IndianRupeeIcon);
export const KeyRound = huge(Key01Icon);
export const Layers = huge(Layers01Icon);
export const LayoutTemplate = huge(LayoutTable01Icon);
export const Link2 = huge(Link01Icon);
export const List = huge(LeftToRightListBulletIcon);
export const Lock = huge(SquareLock02Icon);
export const LogOut = huge(Logout01Icon);
export const Mail = huge(Mail01Icon);
export const Megaphone = huge(Megaphone01Icon);
export const MessageCircle = huge(Message01Icon);
export const MousePointer2 = huge(Cursor01Icon);
export const MousePointerClick = huge(CursorPointer01Icon);
export const Package = huge(DeliveryBox01Icon);
export const PauseCircle = huge(PauseIcon);
export const Percent = huge(PercentIcon);
export const Phone = huge(CallIcon);
export const Play = huge(PlayIcon);
export const Plus = huge(PlusSignIcon);
export const QrCode = huge(QrCodeIcon);
export const RefreshCw = huge(RefreshIcon);
export const Repeat = huge(Exchange01Icon);
export const ScrollText = huge(ScrollIcon);
export const Search = huge(Search01Icon);
export const Send = huge(SentIcon);
export const ShieldCheck = huge(ShieldCheckIcon);
export const ShieldPlus = huge(ShieldUserIcon);
export const Shirt = huge(ClothesIcon);
export const ShoppingBag = huge(ShoppingBag01Icon);
export const ShoppingCart = huge(ShoppingCart01Icon);
export const Sparkles = huge(SparklesIcon);
export const Store = huge(Store01Icon);
export const Tag = huge(Tag01Icon);
export const Target = huge(Target01Icon);
export const TrendingUp = huge(ChartIncreaseIcon);
export const Truck = huge(DeliveryTruck01Icon);
export const Undo2 = huge(ArrowTurnBackwardIcon);
export const User = huge(UserIcon);
export const UserCheck = huge(UserCheck01Icon);
export const UserPlus = huge(UserAdd01Icon);
export const Users = huge(UserGroupIcon);
export const Wallet = huge(Wallet01Icon);
export const Watch = huge(SmartWatch01Icon);
export const Webhook = huge(WebhookIcon);
export const Workflow = huge(FlowConnectionIcon);
export const Zap = huge(FlashIcon);
export const AlertTriangle = huge(Alert02Icon);
export const LineChart = huge(ChartLineData01Icon);
export const Receipt = huge(Invoice01Icon);
export const Tree = huge(HierarchyIcon);
export const Chats = huge(MessageMultiple01Icon);
export const Money = huge(Money01Icon);
export const ChevronLeft = huge(ArrowLeft01Icon);
export const Mic = huge(Mic01Icon);
export const Video = huge(Video01Icon);
export const CheckCheck = huge(TickDouble02Icon);

/* Brand marks: only where the brand itself is meant. */
export const ShopifyLogo = brand(SiShopify, 'shopify');
export const WhatsAppLogo = brand(SiWhatsapp, 'whatsapp');
export const MetaLogo = brand(SiMeta, 'meta');
export const OpenAILogo = brand(SiOpenai, 'openai');
export const AnthropicLogo = brand(SiAnthropic, 'anthropic');
export const GeminiLogo = brand(SiGooglegemini, 'gemini');
export const RazorpayLogo = brand(SiRazorpay, 'razorpay');
