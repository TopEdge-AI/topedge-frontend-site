/**
 * Icons for the feature scenes: Phosphor duotone (two-tone, softer and more
 * crafted than single-weight outlines) plus real brand marks. Exported under
 * the names the scenes use, so a scene imports from here instead of
 * lucide-react. `strokeWidth` is accepted for compatibility and ignored:
 * these icons are filled shapes.
 */
import type { IconType as RIcon } from 'react-icons';
import {
  PiArrowSquareOutBold,
  PiArrowUUpLeftDuotone,
  PiArrowsClockwiseDuotone,
  PiBookOpenTextDuotone,
  PiBracketsCurlyDuotone,
  PiCalendarDuotone,
  PiChartLineUpDuotone,
  PiChatCircleDotsDuotone,
  PiChatsCircleDuotone,
  PiCheckBold,
  PiClockDuotone,
  PiCodeDuotone,
  PiCopyDuotone,
  PiCreditCardDuotone,
  PiCrownDuotone,
  PiCubeDuotone,
  PiCurrencyInrDuotone,
  PiCursorClickDuotone,
  PiCursorDuotone,
  PiDownloadSimpleDuotone,
  PiEnvelopeDuotone,
  PiEyeDuotone,
  PiFileTextDuotone,
  PiFingerprintDuotone,
  PiFlaskDuotone,
  PiFlowArrowDuotone,
  PiFolderDuotone,
  PiFootprintsDuotone,
  PiFunnelDuotone,
  PiGaugeDuotone,
  PiGiftDuotone,
  PiGitBranchDuotone,
  PiHandTapDuotone,
  PiHeadsetDuotone,
  PiHouseDuotone,
  PiKeyDuotone,
  PiLayoutDuotone,
  PiLightningDuotone,
  PiLinkDuotone,
  PiListBulletsDuotone,
  PiLockDuotone,
  PiMagnifyingGlassDuotone,
  PiMegaphoneDuotone,
  PiMoneyDuotone,
  PiPackageDuotone,
  PiPaperPlaneTiltDuotone,
  PiPauseCircleDuotone,
  PiPercentDuotone,
  PiPhoneDuotone,
  PiPlayDuotone,
  PiPlusBold,
  PiPulseDuotone,
  PiQrCodeDuotone,
  PiReceiptDuotone,
  PiRepeatDuotone,
  PiRobotDuotone,
  PiScrollDuotone,
  PiSealCheckDuotone,
  PiShieldCheckDuotone,
  PiShieldPlusDuotone,
  PiShoppingBagDuotone,
  PiShoppingCartDuotone,
  PiSignOutDuotone,
  PiSortDescendingDuotone,
  PiSparkleDuotone,
  PiStackDuotone,
  PiStorefrontDuotone,
  PiTShirtDuotone,
  PiTagDuotone,
  PiTargetDuotone,
  PiTrayDuotone,
  PiTreeStructureDuotone,
  PiTrendUpDuotone,
  PiTruckDuotone,
  PiUserCheckDuotone,
  PiUserDuotone,
  PiUserPlusDuotone,
  PiUsersThreeDuotone,
  PiWalletDuotone,
  PiWarningDuotone,
  PiWatchDuotone,
  PiWebhooksLogoDuotone,
} from 'react-icons/pi';
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

const wrap = (I: RIcon, cls = 'fv-pi') => {
  function SceneIcon({ className }: SceneIconProps) {
    return <I className={className ? `${cls} ${className}` : cls} aria-hidden />;
  }
  return SceneIcon;
};

export const Activity = wrap(PiPulseDuotone);
export const ArrowDownWideNarrow = wrap(PiSortDescendingDuotone);
export const BadgeCheck = wrap(PiSealCheckDuotone);
export const BookOpen = wrap(PiBookOpenTextDuotone);
export const Bot = wrap(PiRobotDuotone);
export const Boxes = wrap(PiCubeDuotone);
export const Braces = wrap(PiBracketsCurlyDuotone);
export const CalendarDays = wrap(PiCalendarDuotone);
export const Check = wrap(PiCheckBold);
export const Clock = wrap(PiClockDuotone);
export const Code2 = wrap(PiCodeDuotone);
export const Copy = wrap(PiCopyDuotone);
export const CreditCard = wrap(PiCreditCardDuotone);
export const Crown = wrap(PiCrownDuotone);
export const Download = wrap(PiDownloadSimpleDuotone);
export const ExternalLink = wrap(PiArrowSquareOutBold);
export const Eye = wrap(PiEyeDuotone);
export const FileText = wrap(PiFileTextDuotone);
export const Filter = wrap(PiFunnelDuotone);
export const Fingerprint = wrap(PiFingerprintDuotone);
export const FlaskConical = wrap(PiFlaskDuotone);
export const Folder = wrap(PiFolderDuotone);
export const Footprints = wrap(PiFootprintsDuotone);
export const Gauge = wrap(PiGaugeDuotone);
export const Gift = wrap(PiGiftDuotone);
export const GitBranch = wrap(PiGitBranchDuotone);
export const Hand = wrap(PiHandTapDuotone);
export const Headphones = wrap(PiHeadsetDuotone);
export const Home = wrap(PiHouseDuotone);
export const Inbox = wrap(PiTrayDuotone);
export const IndianRupee = wrap(PiCurrencyInrDuotone);
export const KeyRound = wrap(PiKeyDuotone);
export const Layers = wrap(PiStackDuotone);
export const LayoutTemplate = wrap(PiLayoutDuotone);
export const Link2 = wrap(PiLinkDuotone);
export const List = wrap(PiListBulletsDuotone);
export const Lock = wrap(PiLockDuotone);
export const LogOut = wrap(PiSignOutDuotone);
export const Mail = wrap(PiEnvelopeDuotone);
export const Megaphone = wrap(PiMegaphoneDuotone);
export const MessageCircle = wrap(PiChatCircleDotsDuotone);
export const MousePointer2 = wrap(PiCursorDuotone);
export const MousePointerClick = wrap(PiCursorClickDuotone);
export const Package = wrap(PiPackageDuotone);
export const PauseCircle = wrap(PiPauseCircleDuotone);
export const Percent = wrap(PiPercentDuotone);
export const Phone = wrap(PiPhoneDuotone);
export const Play = wrap(PiPlayDuotone);
export const Plus = wrap(PiPlusBold);
export const QrCode = wrap(PiQrCodeDuotone);
export const RefreshCw = wrap(PiArrowsClockwiseDuotone);
export const Repeat = wrap(PiRepeatDuotone);
export const ScrollText = wrap(PiScrollDuotone);
export const Search = wrap(PiMagnifyingGlassDuotone);
export const Send = wrap(PiPaperPlaneTiltDuotone);
export const ShieldCheck = wrap(PiShieldCheckDuotone);
export const ShieldPlus = wrap(PiShieldPlusDuotone);
export const Shirt = wrap(PiTShirtDuotone);
export const ShoppingBag = wrap(PiShoppingBagDuotone);
export const ShoppingCart = wrap(PiShoppingCartDuotone);
export const Sparkles = wrap(PiSparkleDuotone);
export const Store = wrap(PiStorefrontDuotone);
export const Tag = wrap(PiTagDuotone);
export const Target = wrap(PiTargetDuotone);
export const TrendingUp = wrap(PiTrendUpDuotone);
export const Truck = wrap(PiTruckDuotone);
export const Undo2 = wrap(PiArrowUUpLeftDuotone);
export const User = wrap(PiUserDuotone);
export const UserCheck = wrap(PiUserCheckDuotone);
export const UserPlus = wrap(PiUserPlusDuotone);
export const Users = wrap(PiUsersThreeDuotone);
export const Wallet = wrap(PiWalletDuotone);
export const Watch = wrap(PiWatchDuotone);
export const Webhook = wrap(PiWebhooksLogoDuotone);
export const Workflow = wrap(PiFlowArrowDuotone);
export const Zap = wrap(PiLightningDuotone);
export const AlertTriangle = wrap(PiWarningDuotone);
export const LineChart = wrap(PiChartLineUpDuotone);
export const Receipt = wrap(PiReceiptDuotone);
export const Tree = wrap(PiTreeStructureDuotone);
export const Chats = wrap(PiChatsCircleDuotone);
export const Money = wrap(PiMoneyDuotone);

/* Brand marks: use in their own colours, only where the brand is meant. */
export const ShopifyLogo = wrap(SiShopify, 'fv-brand fv-brand--shopify');
export const WhatsAppLogo = wrap(SiWhatsapp, 'fv-brand fv-brand--whatsapp');
export const MetaLogo = wrap(SiMeta, 'fv-brand fv-brand--meta');
export const OpenAILogo = wrap(SiOpenai, 'fv-brand fv-brand--openai');
export const AnthropicLogo = wrap(SiAnthropic, 'fv-brand fv-brand--anthropic');
export const GeminiLogo = wrap(SiGooglegemini, 'fv-brand fv-brand--gemini');
export const RazorpayLogo = wrap(SiRazorpay, 'fv-brand fv-brand--razorpay');
