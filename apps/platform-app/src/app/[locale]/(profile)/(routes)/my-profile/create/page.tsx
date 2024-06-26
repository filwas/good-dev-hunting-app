import CreateProfileForm from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileForm/CreateProfileForm'
import { UploadProvider } from '@/contexts/UploadContext'

const CreateProfilePage = async () => {
  return (
    <UploadProvider>
      <CreateProfileForm />
    </UploadProvider>
  )
}

export default CreateProfilePage
