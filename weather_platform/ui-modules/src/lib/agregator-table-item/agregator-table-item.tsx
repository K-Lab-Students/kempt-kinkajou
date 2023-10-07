import styles from './agregator-table-item.module.scss';
import { Agregator, Prisma } from "@weather-platform/prisma-clients/Agregators";

/* eslint-disable-next-line */
export interface AgregatorTableItemProps {
  agregator: Agregator
}

export function AgregatorTableItem(props: AgregatorTableItemProps) {
  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">
            { props.agregator.name }
          </p>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          { props.agregator.lat }, { props.agregator.lng }
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          <span
            className="relative inline-block px-3 py-1 font-semibold leading-tight bg-gray-200 rounded-lg">
              4/50
          </span>
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">
          { props.agregator.createdAt.toString() }
        </p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <span
                                  className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                    <span aria-hidden="true"
                                          className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                    </span>
                                    <span className="relative">
                                        active
                                    </span>
                                </span>
      </td>
    </tr>
  );
}

export default AgregatorTableItem;
