import { validate } from 'validate.js'

const constraints = {
    email: {
      presence: {
        message: "address is required"
      },
      email: true
    },
    password: {
      presence: {
        message: "is required."
      },
      length: {
        minimum: 5,
        maximum: 20,
        message: 'must be at least 5 characters'
      }
    },
    confirmPassword: {
      presence: {
        message: "is required."
      },
    equality: "password",
    length: {
      minimum: 5,
      maximum: 20,
      message: 'Your password must be at least 5 characters'
    }
  },
  firstname: {
    presence: {
      message: "is required."
    },
  },
  lastname: {
    presence: {
      message: "is required."
    },
  },
  referralId: {
    presence: {
      message: "is required."
    },
  },
  gender: {
    presence: {
      message: "is required."
    },
  },
  dob: {
    presence: {
      message: "is required."
    },
  },
  mobile: {
    presence: {
      message: "number is required."
    },
    length: {
      minimum: 5,
      maximum: 15,
      message: function(value) {
        if(value.length < 5){
          return 'Number length should be minimum 5';
        }
        if(value.length > 15){
          return 'Number length should be maximum 15';
        }
      },
    }
  }
}

export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] });
}