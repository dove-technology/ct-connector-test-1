import { UpdateAction } from '@commercetools/sdk-client-v2';

import { createApiRoot } from '../client/create.client';
import CustomError from '../errors/custom.error';
import { Resource } from '../interfaces/resource.interface';

import { logger } from '../utils/logger.utils';

/**
 * Handle the create action
 *
 * @param {Resource} resource The resource from the request body
 * @returns {object}
 */
const create = async (resource: Resource) => {
  let productId = undefined;

  try {
    const updateActions: Array<UpdateAction> = [];

    // Deserialize the resource to a CartDraft
    const cartDraft = JSON.parse(JSON.stringify(resource));

    if (cartDraft.obj.lineItems.length !== 0) {
      productId = cartDraft.obj.lineItems[0].productId;
    }

    logger.warn(`In CartController create function...`);

    // Fetch the product with the ID
    // if (productId) {
    //   await createApiRoot()
    //     .products()
    //     .withId({ ID: productId })
    //     .get()
    //     .execute();

    //   // Work with the product
    // }

    const setCountryAction: UpdateAction = {
      action: 'setCountry',
      country: 'GB',
    };

    // Create the UpdateActions Object to return it to the client
    const updateAction: UpdateAction = {
      action: 'recalculate',
      updateProductData: false,
    };

    updateActions.push(setCountryAction);
    updateActions.push(updateAction);

    return { statusCode: 200, actions: updateActions };
  } catch (error) {
    // Retry or handle the error
    // Create an error object
    if (error instanceof Error) {
      throw new CustomError(
        400,
        `Internal server error on CartController: ${error.stack}`
      );
    }
  }
};

// Controller for update actions
const update = async (resource: Resource) => {
  try {
    const updateActions: Array<UpdateAction> = [];

    logger.warn(`In CartController update function...`);

    const setCountryAction: UpdateAction = {
      action: 'setCountry',
      country: 'US',
    };

    // Create the UpdateActions Object to return it to the client
    const updateAction: UpdateAction = {
      action: 'recalculate',
      updateProductData: false,
    };

    updateActions.push(setCountryAction);
    updateActions.push(updateAction);

    return { statusCode: 200, actions: updateActions };
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(
        400,
        `Internal server error on CartController::Update: ${error.stack}`
      );
    }
  }
};

/**
 * Handle the cart controller according to the action
 *
 * @param {string} action The action that comes with the request. Could be `Create` or `Update`
 * @param {Resource} resource The resource from the request body
 * @returns {Promise<object>} The data from the method that handles the action
 */
export const cartController = async (action: string, resource: Resource) => {
  switch (action) {
    case 'Create': {
      logger.warn(`CartController create function about to be called...`);

      const data = await create(resource);
      return data;
    }
    case 'Update':
      logger.warn(`CartController update function about to be called...`);

      const data = await update(resource);
      return data;

    default:
      throw new CustomError(
        500,
        `Internal Server Error - Resource not recognized. Allowed values are 'Create' or 'Update'.`
      );
  }
};
