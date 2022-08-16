export interface Sport {
  id: string;
  name: string;
  description: string;
  timelineType: string;
  periods: string;
  svgSpriteFilename: string;
  sportsFieldFilename: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Countries {
  AF: string;
  ZA: string;
  AX: string;
  AL: string;
  DZ: string;
  DE: string;
  AD: string;
  AO: string;
  AI: string;
  AQ: string;
  AG: string;
  SA: string;
  AR: string;
  AM: string;
  AW: string;
  AU: string;
  AT: string;
  AZ: string;
  BS: string;
  BH: string;
  BD: string;
  BB: string;
  BE: string;
  BZ: string;
  BJ: string;
  BM: string;
  BT: string;
  BY: string;
  BO: string;
  BQ: string;
  BA: string;
  BW: string;
  BR: string;
  BN: string;
  BG: string;
  BF: string;
  BI: string;
  KY: string;
  KH: string;
  CM: string;
  CA: string;
  CV: string;
  CF: string;
  CL: string;
  CN: string;
  CY: string;
  CC: string;
  CO: string;
  KM: string;
  CD: string;
  CG: string;
  KP: string;
  KR: string;
  CR: string;
  CI: string;
  HR: string;
  CU: string;
  CW: string;
  DK: string;
  DJ: string;
  DM: string;
  EG: string;
  SV: string;
  AE: string;
  EC: string;
  ER: string;
  ES: string;
  EE: string;
  US: string;
  ET: string;
  FJ: string;
  FI: string;
  FR: string;
  GA: string;
  GM: string;
  GE: string;
  GS: string;
  GH: string;
  GI: string;
  GR: string;
  GD: string;
  GL: string;
  GP: string;
  GU: string;
  GT: string;
  GG: string;
  GN: string;
  GQ: string;
  GW: string;
  GY: string;
  GF: string;
  HT: string;
  HN: string;
  HK: string;
  HU: string;
  BV: string;
  CX: string;
  IM: string;
  NF: string;
  CK: string;
  FO: string;
  HM: string;
  FK: string;
  MH: string;
  UM: string;
  TC: string;
  VI: string;
  VG: string;
  IN: string;
  ID: string;
  IQ: string;
  IR: string;
  IE: string;
  IS: string;
  IL: string;
  IT: string;
  JM: string;
  JP: string;
  JE: string;
  JO: string;
  KZ: string;
  KE: string;
  KG: string;
  KI: string;
  XK: string;
  KW: string;
  LA: string;
  LS: string;
  LV: string;
  LB: string;
  LR: string;
  LY: string;
  LI: string;
  LT: string;
  LU: string;
  MO: string;
  MK: string;
  MG: string;
  MY: string;
  MW: string;
  MV: string;
  ML: string;
  MT: string;
  MP: string;
  MA: string;
  MQ: string;
  MU: string;
  MR: string;
  YT: string;
  MX: string;
  FM: string;
  MD: string;
  MC: string;
  MN: string;
  ME: string;
  MS: string;
  MZ: string;
  MM: string;
  NA: string;
  NR: string;
  NP: string;
  SZ: string;
  NI: string;
  NE: string;
  NG: string;
  NU: string;
  NO: string;
  NC: string;
  NZ: string;
  IO: string;
  OM: string;
  UG: string;
  UZ: string;
  PK: string;
  PW: string;
  PS: string;
  PA: string;
  PG: string;
  PY: string;
  NL: string;
  PE: string;
  PH: string;
  PN: string;
  PL: string;
  PF: string;
  PR: string;
  PT: string;
  QA: string;
  DO: string;
  RE: string;
  RO: string;
  GB: string;
  RU: string;
  RW: string;
  EH: string;
  PM: string;
  BL: string;
  KN: string;
  SM: string;
  MF: string;
  SX: string;
  VA: string;
  VC: string;
  SH: string;
  LC: string;
  SB: string;
  WS: string;
  AS: string;
  ST: string;
  SN: string;
  RS: string;
  SC: string;
  SL: string;
  SG: string;
  SK: string;
  SI: string;
  SO: string;
  SD: string;
  LK: string;
  SS: string;
  SE: string;
  CH: string;
  SR: string;
  SJ: string;
  SY: string;
  TJ: string;
  TW: string;
  TZ: string;
  TD: string;
  CZ: string;
  TF: string;
  TH: string;
  TL: string;
  TG: string;
  TK: string;
  TO: string;
  TT: string;
  TN: string;
  TM: string;
  TR: string;
  TV: string;
  UA: string;
  UY: string;
  VU: string;
  VE: string;
  VN: string;
  WF: string;
  YE: string;
  ZM: string;
  ZW: string;
}

export interface Language {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Modules {
  RESTRAINED_ACCESS: number;
  BLOCKMARK: number;
  ESHOP_LINKS: number;
  WHITE_LABEL: number;
  GEO_BLOCKING: number;
  ADVERTISING: number;
  REMOTE_CONTROL: number;
  NOTIFICATION: number;
  SIMULCAST: number;
  DVR: number;
  CHAT: number;
  STREAM_CLIPPING: number;
  OPTA_PARSING: number;
  PAYMENT_RESTRICTION: number;
  MULTICAM: number;
  CMS: number;
  SHARE: number;
  LIKE: number;
  PORTRAIT: number;
  LANDSCAPE: number;
  SUBSCRIPTIONS: number;
  TAGS: number;
  STATS: number;
  TUTORIAL: number;
  SETTINGS: number;
  IMPORTDATA: number;
  FAN_SESSIONS_RESTRICTION: number;
  MARKERS: number;
  STATS_GAME: number;
  STATS_LINEUP: number;
  STATS_LINEUP_MAP: number;
  STATS_STANDINGS: number;
  STATS_RESULTS: number;
  GOOGLE_CALENDAR: number;
  PUSH_NOTIFICATIONS: number;
  BUSINESS_PLAYERS: number;
  ADDON_TRIVIA: number;
  ADDON_PREDICTOR: number;
  WARREN: number;
  AWS_STREAM: number;
  CHROMECAST: number;
  AIRPLAY: number;
  PUBLIC_CLIPPING: number;
  ADDON_MOTM: number;
  PAYMENT_PRODUCT: number;
  OTT: number;
  OTT_PLAYER_YOUTUBE: number;
}

export interface Publisher {
  port: number;
  protocol: string;
  appName: string;
  appNameSource: string;
  appNameBroadcast: string;
  appNameVod: string;
  username: string;
  password: string;
}

export interface Wowza {
  publisher: Publisher;
  host: string;
  publishEndpoint: string;
  mediaEndpoint: string;
}

export interface Element {
  id: string;
  name: string;
  playerTypes: string[];
  type: string;
}

export interface GROUP {
  id: string;
  name: string;
  elements: Element[];
}

export interface SPORT {
  id: string;
  name: string;
}

export interface BUSINESS {
  id: string;
  name: string;
}

export interface PLAYERS {
  SPORT: SPORT;
  BUSINESS: BUSINESS;
}

export interface STATES {
  DEFAULT: string;
  HOVER: string;
  ACTIVE: string;
}

export interface Themes {
  GROUPS: GROUP[];
  PLAYERS: PLAYERS;
  STATES: STATES;
}

export interface Placeholder {
  text: string;
}

export interface Defaults {
  placeholder: Placeholder;
}

export interface STATUS {
  ON: string;
  OFF: string;
}

export interface Simulcast {
  FACEBOOK_LIVE: string;
  YOUTUBE_LIVE: string;
  DAILYMOTION_LIVE: string;
  RTMP: string;
  RTMPS: string;
  STATUS: STATUS;
}

export interface Where {
  id: string;
  name: string;
  relations: string[];
  conjunctions: boolean;
}

export interface Set {
  id: string;
  name: string;
  relations: string[];
  conjunctions: boolean;
}

export interface GROUPS {
  where: Where;
  set: Set;
}

export interface Update {
  id: string;
  name: string;
  groups: string[];
}

export interface Select {
  id: string;
  name: string;
  groups: string[];
}

export interface VERBS {
  update: Update;
  select: Select;
}

export interface And {
  id: string;
  name: string;
}

export interface Or {
  id: string;
  name: string;
}

export interface CONJUNCTIONS {
  and: And;
  or: Or;
}

export interface Eq {
  id: string;
  name: string;
}

export interface Ne {
  id: string;
  name: string;
}

export interface Gt {
  id: string;
  name: string;
}

export interface Gte {
  id: string;
  name: string;
}

export interface Lt {
  id: string;
  name: string;
}

export interface Lte {
  id: string;
  name: string;
}

export interface Increment {
  id: string;
  name: string;
}

export interface Decrement {
  id: string;
  name: string;
}

export interface Assign {
  id: string;
  name: string;
}

export interface RELATIONS {
  eq: Eq;
  ne: Ne;
  gt: Gt;
  gte: Gte;
  lt: Lt;
  lte: Lte;
  increment: Increment;
  decrement: Decrement;
  assign: Assign;
}

export interface Field {
  id: string;
  name: string;
  authorizedVerbs: string[];
}

export interface Marker {
  id: string;
  name: string;
  fields: Field[];
}

export interface MODELS {
  Marker: Marker;
}

export interface QueryBuilder {
  GROUPS: GROUPS;
  VERBS: VERBS;
  CONJUNCTIONS: CONJUNCTIONS;
  RELATIONS: RELATIONS;
  MODELS: MODELS;
}

export interface MarkerNotificationGroup {
  id: string;
  name: string;
  notifications: number[];
}

export interface Clips {
  root: string;
  origin: string;
  markers: string;
  skins: string;
  skinPreRoll: string;
  skinPostRoll: string;
}

export interface Prefix {
  vod: string;
  awsVod: string;
  records: string;
  clips: Clips;
}

export interface Buckets {
  assets: string;
  awsStream: string;
}

export interface Aws {
  prefix: Prefix;
  buckets: Buckets;
}

export interface AdminPayload {
  validRoles: string[];
  validTimelineTypes: string[];
  validEventStates: string[];
  validVideoVendorNames: string[];
  sports: Sport[];
  assetsUrl: string;
  imagesUrl: string;
  countries: Countries;
  languages: Language[];
  modules: Modules;
  wowza: Wowza;
  themes: Themes;
  defaults: Defaults;
  simulcast: Simulcast;
  queryBuilder: QueryBuilder;
  markerNotificationGroups: MarkerNotificationGroup[];
  aws: Aws;
}
