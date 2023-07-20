import dayjs from 'dayjs'

import * as api from '@/apis'
import { i18n } from '@/i18n'
import * as store from '@/store'
import getEnv from '@/config'
import * as defaultConfig from '@/config/default'
import * as constant from '@/constant'

export default { api, t: i18n.global.t, store, getEnv, defaultConfig, constant, dayjs, i18n }
