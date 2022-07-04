import { v4 as uuid } from 'uuid';
import {
  CharacterState,
  InventoryItem,
  TemporaryDrop,
} from '../../../shared/types/CharacterState';

export const addItemsToInventory = (
  existingState: CharacterState,
  items: TemporaryDrop[],
): any => {
  const inventory = existingState.inventory;
  items.forEach((value) => {
    if (value.item.stackable) {
      const inventoryIndex = inventory.findIndex(
        (s) => s.itemId === value.item.id,
      );
      if (inventoryIndex > -1) {
        const inventoryItem = inventory[inventoryIndex];
        inventoryItem.amount += value.amount;
      } else {
        inventory.push({
          id: uuid(),
          itemId: value.item.id,
          amount: value.amount,
        });
      }
    } else {
      for (let index = 0; index < value.amount; index++) {
        inventory.push({ id: uuid(), itemId: value.item.id, amount: 1 });
      }
    }
  });
  return inventory;
};

export const canCharacterBuyItem = (
  existingState: CharacterState,
  cost: number,
) => {
  const inventory = existingState.inventory;
  const coinsInventoryItem = inventory.find((s) => s.itemId === 1);
  if (!coinsInventoryItem) {
    return false;
  }
  return coinsInventoryItem.amount - cost > 0;
};

export const addItemToInventoryAfterSale = (
  existingState: CharacterState,
  item: TemporaryDrop,
  cost: number,
) => {
  const inventory = existingState.inventory;
  if (!canCharacterBuyItem(existingState, cost)) {
    return inventory;
  }
  const coinsInventoryItem = inventory.find((s) => s.itemId === 1);
  coinsInventoryItem.amount -= cost;
  return addItemsToInventory({ ...existingState, inventory }, [item]);
};

export const removeItemFromInventory = (
  existingState: CharacterState,
  inventoryItemId: string,
  amount = 1,
) => {
  const inventory = existingState.inventory;
  const inventoryItemIndex = inventory.findIndex(
    (s) => s.id === inventoryItemId,
  );
  if (inventoryItemIndex > -1) {
    const inventoryItem = inventory[inventoryItemIndex];
    if (inventoryItem.amount === 1 && amount === 1) {
      return [
        ...inventory.slice(0, inventoryItemIndex),
        ...inventory.slice(inventoryItemIndex + 1),
      ];
    }
    if (inventoryItem.amount > 1) {
      inventoryItem.amount -= amount;
    }
    return inventory;
  }
};

export const removeItemFromInventoryAfterSale = (
  existingState: CharacterState,
  inventoryItemId: string,
  cost: number,
  amount: number,
) => {
  const inventory = existingState.inventory;
  const coinsInventoryItem = inventory.find((s) => s.itemId === 1);
  if (!coinsInventoryItem) {
    inventory.push({
      id: uuid(),
      itemId: 1,
      amount: amount,
    });
  } else {
    coinsInventoryItem.amount += cost;
  }
  return removeItemFromInventory(
    { ...existingState, inventory },
    inventoryItemId,
    amount,
  );
};

export const getInventoryItem = (
  existingState: CharacterState,
  inventoryItemId: string,
): InventoryItem => {
  const inventory = existingState.inventory;
  return inventory.find((s) => s.id === inventoryItemId);
};
