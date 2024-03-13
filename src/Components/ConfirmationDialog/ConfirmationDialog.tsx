import { Button, Modal } from 'react-bootstrap';
import './ConfirmationDialog.css';
import { EActionNames } from '../../ts/enums';

type dialogType = {
  action: EActionNames | null;
  msg: string;
  buttons: EActionNames[];
}

type actionButton = {
  btnAction: EActionNames;
  variant: string;
}

const buttons: actionButton[] = [
  {
    btnAction: EActionNames.Save,
    variant: 'secondary'
  },
  {
    btnAction: EActionNames.Confirm,
    variant: 'success'
  },
  {
    btnAction: EActionNames.Cancel,
    variant: 'light'
  },
];

const types: dialogType[] = [
  {
    action: EActionNames.Delete,
    msg: 'Are you sure you want to delete this item?',
    buttons: [ EActionNames.Cancel, EActionNames.Confirm ]
  },
  {
    action: EActionNames.Save,
    msg: 'Are you sure you want to save this item?',
    buttons: [ EActionNames.Cancel, EActionNames.Save ]
  },
  {
    action: EActionNames.Edit,
    msg: 'Are you sure you want to edit this item?',
    buttons: [ EActionNames.Cancel, EActionNames.Save ]
  }
];

type Props = {
  stage: string;
  action: EActionNames | null;
  show: () => boolean;
  handleClose: () => void;
  handleClick: (action: EActionNames | null, btnAction: EActionNames | undefined) => void;
}

const ConfirmationDialog = (props: Props) => {
  const { action, stage, show, handleClose, handleClick } = props;
  const isShow = show();
  const type = types.find(t => t.action == action);

  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h6">{action} {stage}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className='modal-body__label'> {type?.msg} </span>
      </Modal.Body>
      <Modal.Footer>
        {type?.buttons?.map((b, index) => {
          const btn = buttons.find(bn => bn.btnAction == b);
          return(
            <Button 
              key={index} 
              variant={btn?.variant} 
              size="sm" 
              onClick={() => handleClick(action, btn?.btnAction)}
            >
              {btn?.btnAction}
            </Button>
          );
        })}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;