import DeleteConfirmationModal from '@components/delete-confirmation-modal.component';
import DeleteButton from '@components/delete-button.component';

import { Id, User } from '@app/declarations';

export const getAdminsTableData = (
  admin: User,
  currentUser: User | undefined,
  onDelete: (adminId: Id) => unknown
) => {
  return [
    { id: 1, node: admin.id, title: 'ID' },
    { id: 2, node: admin.email, title: 'Email' },
    {
      id: 3,
      node: new Date(admin.createdAt || Date.now()).toLocaleString(),
      title: 'Дата создания',
    },
    {
      id: 4,
      node:
        admin.id !== currentUser?.id ? (
          <DeleteConfirmationModal onDelete={() => onDelete(admin.id)} />
        ) : (
          <DeleteButton isDisabled />
        ),
      title: 'Действия',
    },
  ];
};

export default getAdminsTableData;
