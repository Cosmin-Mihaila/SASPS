import { Avatar } from '@/components/avatar'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { TableCell } from '@/components/table'
import { getRecentOrders } from '@/data'
import clsx from 'clsx'

const colors = {
  red: 'bg-red-500/15 text-red-700 group-data-[hover]:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-[hover]:bg-red-500/20',
  orange:
    'bg-orange-500/15 text-orange-700 group-data-[hover]:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-[hover]:bg-orange-500/20',
  amber:
    'bg-amber-400/20 text-amber-700 group-data-[hover]:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-[hover]:bg-amber-400/15',
  yellow:
    'bg-yellow-400/20 text-yellow-700 group-data-[hover]:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-[hover]:bg-yellow-400/15',
  lime: 'bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15',
  green:
    'bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20',
  emerald:
    'bg-emerald-500/15 text-emerald-700 group-data-[hover]:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-[hover]:bg-emerald-500/20',
  teal: 'bg-teal-500/15 text-teal-700 group-data-[hover]:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-[hover]:bg-teal-500/20',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-[hover]:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-[hover]:bg-cyan-400/15',
  sky: 'bg-sky-500/15 text-sky-700 group-data-[hover]:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-[hover]:bg-sky-500/20',
  blue: 'bg-blue-500/15 text-blue-700 group-data-[hover]:bg-blue-500/25 dark:text-blue-400 dark:group-data-[hover]:bg-blue-500/25',
  indigo:
    'bg-indigo-500/15 text-indigo-700 group-data-[hover]:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-[hover]:bg-indigo-500/20',
  violet:
    'bg-violet-500/15 text-violet-700 group-data-[hover]:bg-violet-500/25 dark:text-violet-400 dark:group-data-[hover]:bg-violet-500/20',
  purple:
    'bg-purple-500/15 text-purple-700 group-data-[hover]:bg-purple-500/25 dark:text-purple-400 dark:group-data-[hover]:bg-purple-500/20',
  fuchsia:
    'bg-fuchsia-400/15 text-fuchsia-700 group-data-[hover]:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-[hover]:bg-fuchsia-400/20',
  pink: 'bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-[hover]:bg-pink-400/20',
  rose: 'bg-rose-400/15 text-rose-700 group-data-[hover]:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-[hover]:bg-rose-400/20',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10',
}

export function Stat({ title, value, change }) {
  return (
    <div>
      <hr role="presentation" className={clsx('w-full border-t', 'border-zinc-950/10 dark:border-white/10')} />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <span
          className={clsx(
            'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
            colors[change.startsWith('+') ? 'lime' : 'pink']
          )}
        >
          {change}
        </span>
        <span className="text-zinc-500"> from last week</span>
      </div>
    </div>
  )
}

export default async function Home() {
  let orders = await getRecentOrders()

  return (
    <>
      <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Good afternoon, Erica</h1>
      <div className="mt-8 flex items-end justify-between">
        <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Overview</h2>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <hr role="presentation" className={clsx('w-full border-t', 'border-zinc-950/10 dark:border-white/10')} />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Total revenue</div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">$2.6M</div>
          <div className="mt-3 text-sm/6 sm:text-xs/6">
            <span
              className={clsx(
                'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
                colors.lime
              )}
            >
              +4.5%
            </span>
            <span className="text-zinc-500"> from last week</span>
          </div>
        </div>
        <div>
          <hr role="presentation" className={clsx('w-full border-t', 'border-zinc-950/10 dark:border-white/10')} />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Average order value</div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">$455</div>
          <div className="mt-3 text-sm/6 sm:text-xs/6">
            <span
              className={clsx(
                'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
                colors.pink
              )}
            >
              -0.5%
            </span>
            <span className="text-zinc-500"> from last week</span>
          </div>
        </div>
        <div>
          <hr role="presentation" className={clsx('w-full border-t', 'border-zinc-950/10 dark:border-white/10')} />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Tickets sold</div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">5,888</div>
          <div className="mt-3 text-sm/6 sm:text-xs/6">
            <span
              className={clsx(
                'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
                colors.lime
              )}
            >
              +4.5%
            </span>
            <span className="text-zinc-500"> from last week</span>
          </div>
        </div>
        <div>
          <hr role="presentation" className={clsx('w-full border-t', 'border-zinc-950/10 dark:border-white/10')} />
          <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">Pageviews</div>
          <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">823,067</div>
          <div className="mt-3 text-sm/6 sm:text-xs/6">
            <span
              className={clsx(
                'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
                colors.lime
              )}
            >
              +21.2%
            </span>
            <span className="text-zinc-500"> from last week</span>
          </div>
        </div>
      </div>
      <h2 className="mt-14 text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Recent orders</h2>
      <div className="flow-root">
        <div
          className={clsx(
            'mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]',
            '-mx-[--gutter] overflow-x-auto whitespace-nowrap'
          )}
        >
          <div className={clsx('inline-block min-w-full align-middle', 'sm:px-[--gutter]')}>
            <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
              <thead className={clsx('', 'text-zinc-500 dark:text-zinc-400')}>
                <tr>
                  <th
                    className={clsx(
                      'sm:first:pl-1 sm:last:pr-1',
                      'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10'
                    )}
                  >
                    Order number
                  </th>
                  <th
                    className={clsx(
                      'sm:first:pl-1 sm:last:pr-1',
                      'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10'
                    )}
                  >
                    Purchase date
                  </th>
                  <th
                    className={clsx(
                      'sm:first:pl-1 sm:last:pr-1',
                      'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10'
                    )}
                  >
                    Customer
                  </th>
                  <th
                    className={clsx(
                      'sm:first:pl-1 sm:last:pr-1',
                      'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10'
                    )}
                  >
                    Event
                  </th>
                  <th
                    className={clsx(
                      'sm:first:pl-1 sm:last:pr-1',
                      'text-right',
                      'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] dark:border-b-white/10'
                    )}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    href={order.url}
                    title={`Order #${order.id}`}
                    className={clsx(
                      'has-[[data-row-link][data-focus]]:outline has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%]',
                      'hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]'
                    )}
                  >
                    <td
                      // ref={href ? setCellRef : undefined}
                      className={clsx(
                        'relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
                        'border-b border-zinc-950/5 dark:border-white/5',
                        'sm:first:pl-1 sm:last:pr-1'
                      )}
                    >
                      {order.url && (
                        <Link
                          data-row-link
                          href={order.url}
                          target={undefined}
                          aria-label={`Order #${order.id}`}
                          // tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
                          className="absolute inset-0 focus:outline-none"
                        />
                      )}
                      {order.id}
                    </td>
                    <td
                      // ref={href ? setCellRef : undefined}
                      className={clsx(
                        'text-zinc-500',
                        'relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
                        'border-b border-zinc-950/5 dark:border-white/5',
                        'sm:first:pl-1 sm:last:pr-1'
                      )}
                    >
                      {order.url && (
                        <Link
                          data-row-link
                          href={order.url}
                          target={undefined}
                          aria-label={`Order #${order.id}`}
                          // tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
                          className="absolute inset-0 focus:outline-none"
                        />
                      )}
                      {order.date}
                    </td>
                    <td
                      // ref={href ? setCellRef : undefined}
                      className={clsx(
                        'text-zinc-500',
                        'relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
                        'border-b border-zinc-950/5 dark:border-white/5',
                        'sm:first:pl-1 sm:last:pr-1'
                      )}
                    >
                      {order.url && (
                        <Link
                          data-row-link
                          href={order.url}
                          target={undefined}
                          aria-label={`Order #${order.id}`}
                          // tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
                          className="absolute inset-0 focus:outline-none"
                        />
                      )}
                      {order.customer.name}
                    </td>

                    <td
                      // ref={href ? setCellRef : undefined}
                      className={clsx(
                        'relative px-4 first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))]',
                        'border-b border-zinc-950/5 dark:border-white/5',
                        'sm:first:pl-1 sm:last:pr-1'
                      )}
                    >
                      {order.url && (
                        <Link
                          data-row-link
                          href={order.url}
                          target={undefined}
                          aria-label={`Order #${order.id}`}
                          // tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
                          className="absolute inset-0 focus:outline-none"
                        />
                      )}
                      <div className="flex items-center gap-2">
                        <Avatar src={order.event.thumbUrl} className="size-6" />
                        <span>{order.event.name}</span>
                      </div>
                    </td>
                    <TableCell className="text-right">US{order.amount.usd}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
