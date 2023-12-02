import { Helmet } from 'react-helmet-async';

import { FileUploadView } from 'src/sections/fileupload';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <FileUploadView />
    </>
  );
}
