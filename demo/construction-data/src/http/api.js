import { get } from './config'

// 看板-巡检
export function getDashboardDailyRecord (deptId) {
  return get(`/api/dashboard/dailyRecord/${deptId}`)
}

// 看板-报修
export function getDashboardRepairRecord (deptId) {
  return get(`/api/dashboard/repairRecord/${deptId}`)
}

// 看板-设备集合
export function getDashboardEquipments (deptId) {
  return get(`/api/dashboard/equipments/${deptId}`)
}

// 看板-报修单集合
export function getDashboardRepairs (deptId) {
  return get(`/api/dashboard/repairs/${deptId}`)
}

// 看板-巡检设备集合
export function getDashboardChecks (deptId) {
  return get(`/api/dashboard/checks/${deptId}`)
}
