import {
  centerData
} from '../model/data';
/**
 *
 */
export default class Centers {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  findAll() {
    this.res.status(200).json({
      val: centerData
    });
  }

  findOne(id) {
    const found = centerData.filter(m => m.centerId === parseInt(id, 10));
    this.res.status(200).json({
      val: found
    });
  }

  create(data) {
    const id = (centerData[centerData.length - 1].centerId) + 111;
    const newCenter = {
      centerId: id,
      centerName: data.name,
      centerLocation: data.location
    };
    centerData.push(newCenter);
    this.res.status(201).json({
      val: newCenter
    });
  }

  delete(id) {
    const dataIndex = centerData.findIndex(m => m.centerId === parseInt(id, 10));
    centerData.splice(dataIndex, 1);
    this.res.status(200).json({
      msg: 'Deleted'
    });
  }

  put(id, data) {
    const dataIndex = centerData.findIndex(m => m.centerId === parseInt(id, 10));
    centerData[dataIndex].centerName = data.name;
    centerData[dataIndex].centerLocation = data.location;

    this.res.status(200).json(centerData[dataIndex]);
  }
}
