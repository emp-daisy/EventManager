import {
  centerData
} from '../model/data';
import Validator from '../middleware/validator';
/**
 *
 */
export default class Centers {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  findAll() {
    return this.res.status(200).json({
      val: centerData,
      msg: 'Centers returned'
    });
  }

  findOne(id) {
    const found = centerData.filter(m => m.centerId === parseInt(id, 10));

    if (found.length === 0) {
      return this.res.status(400).json({
        msg: 'Center not found'
      });
    }

    return this.res.status(200).json({
      val: found,
      msg: 'Center found'
    });
  }

  create(data) {
    const validateRes = Validator.validateCenter(data);
    if (validateRes !== true) {
      return this.res.status(400).json({
        msg: validateRes
      });
    }
    const id = (centerData[centerData.length - 1].centerId) + 111;
    const newCenter = {
      centerId: id,
      centerName: data.name,
      centerLocation: data.location
    };
    centerData.push(newCenter);
    return this.res.status(201).json({
      val: newCenter,
      msg: 'Center added successfully'
    });
  }

  delete(id) {
    const dataIndex = centerData.findIndex(m => m.centerId === parseInt(id, 10));
    if (dataIndex < 0) {
      return this.res.status(400).json({
        msg: 'Center not found'
      });
    }
    centerData.splice(dataIndex, 1);
    return this.res.status(200).json({
      msg: 'Center deleted'
    });
  }

  update(id, data) {
    const dataIndex = centerData.findIndex(m => m.centerId === parseInt(id, 10));
    if (dataIndex < 0) {
      return this.res.status(400).json({
        msg: 'Center not found'
      });
    }

    const validateRes = Validator.validateCenter(data);
    if (validateRes !== true) {
      return this.res.status(400).json({
        msg: validateRes
      });
    }
    centerData[dataIndex].centerName = data.name;
    centerData[dataIndex].centerLocation = data.location;

    return this.res.status(200).json({
      result: centerData[dataIndex],
      msg: 'Center updated successfully'
    });
  }
}
