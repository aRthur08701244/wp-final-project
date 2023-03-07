const makeName = (name, to) => { return String([name, to].join('_')); };

const Subscription = {
  course: {
    subscribe: (parent, { campusName }, { pubsub }) => {
      return pubsub.subscribe(`campus ${campusName}`);
    }
  },
  semester: {
    subscribe: (parent, { courseName }, { pubsub }) => {
      return pubsub.subscribe(`course ${courseName}`);
    }
  },
  chatbox: {
    subscribe: (parent, { semesterName }, { pubsub }) => {
      return pubsub.subscribe(`semester ${semesterName}`);
    }
  },
  message: {
    subscribe: (parent, { chatboxName }, { pubsub }) => {
      return pubsub.subscribe(`chatBox ${chatboxName}`);
    }
  }
};

export { Subscription as default };
