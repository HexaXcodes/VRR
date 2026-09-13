import axios from 'axios'
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})
async function postLead(path, data, config) {
  try {
    const response = await apiClient.post(path, data, config)
    if (!response.data?.success) throw new Error(response.data?.message || 'Unable to submit your request.')
    return response.data
  } catch (error) {
    if (axios.isCancel(error)) throw error
    throw {
      message: error.response?.data?.message || (error.code === 'ECONNABORTED' ? 'The request timed out. Please try again.' : 'Unable to submit your request. Please try again or call our admissions team.'),
      errors: error.response?.data?.errors || [],
      status: error.response?.status,
    }
  }
}
export const submitLead = (data, config) => postLead('/leads', data, config)
export const submitFeeStructureRequest = (data, config) => postLead('/leads/fee-structure', data, config)
export const submitCampusVisitRequest = (data, config) => postLead('/leads/campus-visit', data, config)
export const submitCounsellingRequest = (data, config) => postLead('/leads/counselling', data, config)
export default apiClient
