import config from './config';

/**
 * @description - Utility class for API request methods
 * @export
 * @class Data
 */
export default class Data {

  /**
   * @description - Helper function for sending requests to custom REST API - only called in this file 
   * @param {string} path - Root of path located in ./config.js
   * @param {string} [method='GET']
   * @param {object} [body=null]
   * @param {boolean} [requiresAuth=false]
   * @param {object: {user.emailAddress, user.password}} [credentials=null]
   * @returns fetch call
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  
  /**
   * @description - Get courses from API
   * @returns - JSON list of courses from API
   */
  async getCourses() {
    try {
      const response = await this.api(`/courses`, 'GET', null);
      const courseJson = await response.json();
      console.log(response);
      if (response.status === 200) {
        return courseJson;

      } else if (response.status === 500) {
        return { res: 500, statusText: courseJson.statusText, details: courseJson };

      } else {
        throw new Error();
      }
      
    } catch (err) {
      console.error(err);
      return err;
    }
  }


  /**
   * @description - Get registered user from API
   * @param {string} username
   * @param {string} password
   * @returns User JSON from API
   */
  async getUser(username, password) {
    try {
      const response = await this.api(`/users`, 'GET', null, true, { username, password });
      const userJson = await response.json();

      if (response.status === 200) {  
        return userJson;

      } else if (response.status === 401) {
        return {res: null, msg: userJson.message};

      } else {
        throw new Error();
      }

    } catch (err) {
      console.error(err);
      return err;
    }
  }
  

  /**
   * @description - Register User with API
   * @param {object} user
   * @returns 201 for success || 400 and error messages if request fails
   */
  async createUser(user) {
    try {
      const response = await this.api('/users', 'POST', user);

      if (response.status === 201) {
        return [];

      } else if (response.status === 400) { 
        const newUserJson = await response.json();
        return {res: null, msg: newUserJson.message};
 
      } else {
        throw new Error();
      }

    } catch (err) {
      console.error(err);
      return err;
    }
  }


  /**
   * @description Add course to API
   * @param {object} course
   * @param {string} username
   * @param {string} password
   * @returns 201 for success || 400 and error messages if request fails
   */
  async createCourse(course, username, password) {
    try {
      const response = await this.api('/courses', 'POST', course, true, { username, password });

      if (response.status === 201) {
        return [];

      } else if (response.status === 400) {
        const newCourseJson = await response.json();
        return {res: null, msg: newCourseJson.message};

      } else {
        throw new Error();
      }

    } catch (err) {
      console.error(err);
      return err;
    }
  }


  /**
   * @description - Update course on API
   * @param {object} course
   * @param {string} courseID
   * @param {string} username
   * @param {string} password
   * @returns 204 for success || [ 400 || 403 ] and error messages if request fails
   */
  async updateCourse(course, courseID, username, password) {
    try {
      const response = await this.api(`/courses/${courseID}`, 'PUT', course, true, { username, password });

      if (response.status === 204) {
        return [];

      } else if (response.status === 400 || response.status === 403) { 
        const updateCourseJson = await response.json(); 
        return {res: null, msg: updateCourseJson.message};

      } else {
        throw new Error();
      }

    } catch (err) {
      console.error(err);
      return err;
    }
  }


  /**
   * @description - Remove course from API
   * @param {string} courseID
   * @param {string} username
   * @param {string} password
   * @returns 204 for success || [ 400 || 403 ] and error messages if request fails
   */
  async deleteCourse(courseID, username, password) {
    try {
      const response = await this.api(`/courses/${courseID}`, 'DELETE', null, true, { username, password });

      if (response.status === 204) {
        return [];

      } else if (response.status === 400 || response.status === 403) {
        const deleteJson = await response.json();
        return {res: null, msg: deleteJson.message};
 
      } else {
        throw new Error();
      }

    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
