// 基础组件
import Button from './button/index'
import Icon from './icon/index'
import CellGroup from './cellGroup/index'
import Cell from './cell/index'
import Row from './row/index'
import Col from './col/index'
import Popup from './popup/index'

// 表单组件
import Checkbox from './checkbox/index'
import CheckboxGroup from './checkboxGroup/index'
import Field from './field/index'
import NumberKeyboard from './numberKeyboard/index'
import PasswordInput from './passwordInput/index'
import Radio from './radio/index'
import RadioGroup from './radioGroup/index'
import Rate from './rate/index'
import Search from './search/index'
import Slider from './slider/index'
import Stepper from './stepper/index'
import Switch from './switch/index'
import SwitchCell from './switchCell/index'
import Uploader from './uploader/index'
import Picker from './picker/index'
import DatetimePicker from './dateTimePicker/index'

// 反馈组件
import Actionsheet from './actionsheet/index'
import Dialog from './dialog/index'
import Loading from './loading/index'
import Toast from './toast/index'
import Notify from './notify/index'
import PullRefresh from './pullRefresh/index'
import SwipeCell from './swipeCell/index'

// 展示组件
import Circle from './circle/index'
import Collapse from './collapse/index'
import CollapseItem from './collapseItem/index'
import List from './list/index'
import NoticeBar from './noticeBar/index'
import Progress from './progress/index'
import Swipe from './swipe/index'
import SwipeItem from './swipe-item/index'
import Tag from './tag/index'
import Lazyload from './lazyLoad/index'
import Steps from './steps/index'
import Step from './step/index'
import QRcode from './qrcode/index'
import Scroller from './scroller/index'

// 导航组件
import IndexBar from './indexBar/index'
import IndexAnchor from './indexAnchor/index'
import Sidebar from './sidebar/index'
import SidebarItem from './sidebarItem/index'
import NavBar from './navBar/index'
import Pagination from './pagination/index'
import Tabbar from './tabbar/index'
import TabbarItem from './tabbarItem/index'
import TabItem from './tabItem/index'
import Tabs from './tabs/index'
import TreeSelect from './treeSelect/index'

// 地址数据
import ChinaAddressData from './area/area'

// 业务组件
import Area from './area/index'
import AddressEdit from './addressEdit/index'

// 网络请求
import Axios from './axios/index'

// 图表
import {Chart, Line, ChartArea, Bar, Pie, Point, Scale, Axis, Guide, Tooltip, Legend} from './charts/index'

const version = '1.0.9'

const components = [
  Button,
  Icon,
  CellGroup,
  Cell,
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup, 
  Field,
  NumberKeyboard,
  PasswordInput,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Stepper,
  Switch,
  SwitchCell,
  Uploader,
  Picker,
  DatetimePicker,
  Circle,
  Collapse,
  CollapseItem,
  List,
  NoticeBar,
  Progress,
  Swipe,
  SwipeItem,
  Tag,
  Lazyload,
  Steps,
  Step,
  QRcode,
  Scroller,
  Actionsheet,
  Dialog,
  Loading,
  Toast,
  Notify,
  PullRefresh,
  SwipeCell,
  IndexBar,
  IndexAnchor,
  Sidebar,
  SidebarItem,
  NavBar,
  Pagination,
  Tabbar,
  TabbarItem,
  TabItem,
  Tabs,
  TreeSelect,
  ChinaAddressData,
  Area,
  AddressEdit,
  Axios,
  Chart,
  Line,
  ChartArea,
  Bar,
  Pie,
  Point,
  Scale,
  Axis,
  Guide,
  Tooltip,
  Legend
]

const install = (Vue)=> {
  components.forEach(Component=> {
    Vue.use(Component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  version,
  Button,
  Icon,
  CellGroup,
  Cell,
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup, 
  Field,
  NumberKeyboard,
  PasswordInput,
  Radio,
  RadioGroup,
  Rate,
  Search,
  Slider,
  Stepper,
  Switch,
  SwitchCell,
  Uploader,
  Picker,
  DatetimePicker,
  Circle,
  Collapse,
  CollapseItem,
  List,
  NoticeBar,
  Progress,
  Swipe,
  SwipeItem,
  Tag,
  Lazyload,
  Steps,
  Step,
  QRcode,
  Scroller,
  Actionsheet,
  Dialog,
  Loading,
  Toast,
  Notify,
  PullRefresh,
  SwipeCell,
  IndexBar,
  IndexAnchor,
  Sidebar,
  SidebarItem,
  NavBar,
  Pagination,
  Tabbar,
  TabbarItem,
  TabItem,
  Tabs,
  TreeSelect,
  ChinaAddressData,
  Area,
  AddressEdit,
  Axios,
  Chart,
  Line,
  ChartArea,
  Bar,
  Pie,
  Point,
  Scale,
  Axis,
  Guide,
  Tooltip,
  Legend
}

export default {
  install,
  version
}
