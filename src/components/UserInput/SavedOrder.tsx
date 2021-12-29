import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl} from "@material-ui/core";
import {useSelector} from "react-redux";

function getModalStyle() {
    const top = 50 
    const left = 50 
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


  const SavedOrder = () => {
      let savedOrders = useSelector((state: {saveDraft: {order: string}}) => state.saveDraft);

        
  }