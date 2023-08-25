export interface INavBarData {
  routeLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: INavBarData[];
}
