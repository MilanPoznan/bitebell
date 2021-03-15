/**
 * Wrapper functon that adds timeout handling for fetch api
 * 
 * @param {function} fetchFunc 
 * @param {any} data 
 * @param {number} timeout 
 */
export const fetchWithTimeout = (fetchFunc, data, timeout) => {
  return Promise.race([
    fetchFunc(data),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}

export const getMinsOfRead = (content) => {
  let totalWordsPerMin = Math.floor(content.split(' ').length / 200)
  let totalMins = totalWordsPerMin === 0 ? 1 : totalWordsPerMin
  return totalMins
}

/**
 * 
 * @param {boolean} isRequired getting data from backend from true/false field 
 * @param {string} fieldValue state field value 
 * 
 * If field is required it will return fieldValue value in bool type
 * If field is not required it will return true automatically and if statement will pass 
 */
export const checkIsFieldValid = (isRequired, fieldValue) => isRequired ? !!fieldValue : true