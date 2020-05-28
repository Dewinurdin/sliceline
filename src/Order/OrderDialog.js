import React from 'react';
import { 
  Dialog, DialogContent, DialogShadow, DialogFooter, ConfirmButton 
} from '../FoodDialog/FoodDialog';

export function OrderDialog({openOrderDialog, setOpenOrderDialog, setOrders}){
  return openOrderDialog ? 
    (
    <>
      <DialogShadow />
      <Dialog>
        <DialogContent style={{textAlign: "center"}}>
          <h2>
            <span role="img" aria-label="car emoji">🚗 Order Sent!</span>
          </h2>
          <p>(Use Console to display details objects)</p>
          <h4>Your email confirmation is sent.</h4>
          <h4>Thank you for choosing SliceLine!</h4>
        </DialogContent>
        <DialogFooter>
          <ConfirmButton
            onClick={() => {
              // Clear out order
              setOrders([]);
              // Set open order dialog to Nothing
              setOpenOrderDialog();
            }}
          >
            I'm Still Hungry
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </> 
    ) : ( <div/> )
}