import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FILE_TYPE } from 'utils/common-constants';
import FormDialog from '../dialog/form-dialog/form-dialog';

const DocumentViewer = ({
  handleClose, open, src, type
}) => {
  const [t] = useTranslation();
  const [ fileUrl, setFileUrl ] = useState('');
  useEffect(() => {
    switch (type) {
      case FILE_TYPE.PDF:
      case 'pdf':
        setFileUrl(`data:${FILE_TYPE.PDF};base64,${src}`);
        break;
      case FILE_TYPE.JPEG:
      case 'jpeg':
        setFileUrl(`data:${FILE_TYPE.JPEG};base64,${src}`);
        break;
      case FILE_TYPE.PNG:
      case 'png':
        setFileUrl(`data:${FILE_TYPE.PNG};base64,${src}`);
        break;
      default:
        break;
    }
  }, [src]);

  return (
    <FormDialog
      title={t('verifier.documentViewer')}
      open={open}
      enableButton={false}
      width={1000}
      handleClose={handleClose}
    >
      <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          height: '750px'
        }}
      >
        {' '}
        { src && fileUrl
        && (
          <iframe
            title="image-pdf-viewer"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              height: '750px',
              width: '100%'
            }}
            src={`${fileUrl}#toolbar=0`}
          />
        )}
      </div>
    </FormDialog>
  );
};

export default DocumentViewer;
