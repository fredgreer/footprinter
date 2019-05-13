import FileSaver from 'file-saver';

const saveFile = (contents, name) => {
  const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, name);
};

export default saveFile;
