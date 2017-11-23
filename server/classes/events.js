import {
  eventData
} from '../model/data';
/**
 *
 */
export default class Events {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  findAll() {
    this.res.status(200).json({
      val: eventData
    });
  }
  findOne(id) {
    const found = eventData.filter(m => m.eventId === parseInt(id, 10));
    this.res.status(200).json({
      val: found
    });
  }
  create(data) {
    const id = (eventData[eventData.length - 1].eventId) + 1;
    const newEvent = {
      eventId: id,
      eventName: data.name,
      eventLocation: data.location,
      eventDate: data.eDate,
      createdBy: data.user
    };
    console.log(newEvent);
    eventData.push(newEvent);
    this.res.status(201).json({
      val: newEvent
    });
  }

  delete(id) {
    const dataIndex = eventData.findIndex(m => m.eventId === parseInt(id, 10));
    eventData.splice(dataIndex, 1);
    this.res.status(200).json({
      msg: 'Deleted'
    });
  }
  put(id, data) {
    const dataIndex = eventData.findIndex(m => m.eventId === parseInt(id, 10));
    eventData[dataIndex].eventName = data.name;
    eventData[dataIndex].eventLocation = data.location;
    this.res.status(200).json(eventData[dataIndex]);
  }
}
