import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'
const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Contact created')
      formMethods.reset()
    },
  })
  const onSubmit = (data) => {
    console.log(data)
    create({ variables: { input: data } })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster
        toastOptions={{
          success: {
            style: {
              border: '1px solid #c6f6d5',
              color: '#38a169',
            },
          },
        }}
      />
      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <FormError error={error} wrapperStyle={{ color: 'red' }} />
        <Label>Name</Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />
        <Label>Email</Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
          }}
        />
        <FieldError name="email" className="error" />
        <Label>Message</Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{
            required: true,
          }}
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Send Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
