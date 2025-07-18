import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ErrorAlertProps {
  titleError?: string;
  messageError?: string;
}

export function ErrorAlert({ messageError, titleError }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>{titleError}</AlertTitle>
      <AlertDescription>{messageError}</AlertDescription>
    </Alert>
  );
}
