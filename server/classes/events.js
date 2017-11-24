import {
  eventData
} from '../model/data';
import Validator from '../middleware/validator';
/**
 *
 */
export default class Events {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  findAll() {
    return this.res.status(200).json({
      val: eventData
    });
  }
  findOne(id) {
    const found = eventData.filter(m => m.eventId === parseInt(id, 10));
    if (found.length === 0) {
      return this.res.status(400).json({
        msg: 'Event not found'
      });
    }
    return this.res.status(200).json({
      val: found
    });
  }
  create(data) {
    const validateRes = Validator.validateEvent(data);
    if (validateRes !== true) {
      return this.res.status(400).json({
        msg: validateRes
      });
    }
    const id = (eventData[eventData.length - 1].eventId) + 1;
    const newEvent = {
      eventId: id,
      eventName: data.name,
      eventLocation: data.location,
      eventDate: data.eDate,
      createdBy: data.user
    };

    eventData.push(newEvent);
    return this.res.status(201).json({
      val: newEvent
    });
  }

  delete(id) {
    const dataIndex = eventData.findIndex(m => m.eventId === parseInt(id, 10));
    if (dataIndex < 0) {
      return this.res.status(400).json({
        msg: 'Event not found'
      });
    }
    eventData.splice(dataIndex, 1);
    return this.res.status(200).json({
      msg: 'Deleted'
    });
  }

  put(id, data) {
    const dataIndex = eventData.findIndex(m => m.eventId === parseInt(id, 10));
    if (dataIndex < 0) {
      return this.res.status(400).json({
        msg: 'Event not found'
      });
    }
    const validateRes = Validator.validateEvent(data);
    if (validateRes !== true) {
      return this.res.status(400).json({
        msg: validateRes
      });
    }
    eventData[dataIndex].eventName = data.name;
    eventData[dataIndex].eventLocation = data.location;
    return this.res.status(200).json(eventData[dataIndex]);
  }
}
