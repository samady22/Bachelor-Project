import { PlaceDTO } from '../dto/place.dto';
import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class PlaceService {
  async getPlaces(placeDto: any) {
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${placeDto.nearLoactionType}/list-in-boundary`,
      params: {
        bl_latitude: placeDto.boundSW.lat,
        tr_latitude: placeDto.boundNE.lat,
        bl_longitude: placeDto.boundSW.lng,
        tr_longitude: placeDto.boundNE.lng,
        restaurant_tagcategory_standalone: '10591',
        restaurant_tagcategory: '10591',
        limit: '30',
        currency: 'USD',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': 'bf78d4722amsh230ce4a06137513p143b0fjsn611f5a4b0ed6',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    return axios
      .request(options)
      .then(function (response) {
        return {
          status: HttpStatus.OK,
          message: 'Place data successfully retrieved',
          data: response.data,
        };
      })
      .catch(function (error) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Fail to retrieved place data',
          data: [],
        };
      });
  }
}
