import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Link } from '@/components/link'
import { getOrder } from '@/data'
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { notFound } from 'next/navigation'
import { RefundOrder } from './refund'

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

export async function generateMetadata({ params }) {
  let order = await getOrder(params.id)

  return {
    title: order && `Order #${order.id}`,
  }
}

export default async function Order({ params }) {
  let order = await getOrder(params.id)

  if (!order) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/orders" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orders
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Order #{order.id}</h1>
          <span
            className={clsx(
              'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
              colors.lime
            )}
          >
            Successful
          </span>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>US{order.amount.usd}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span className="inline-flex gap-3">
                {order.payment.card.type}{' '}
                <span>
                  <span aria-hidden="true">••••</span> {order.payment.card.number}
                </span>
              </span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.date}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <RefundOrder outline amount={order.amount.usd}>
              Refund
            </RefundOrder>
            <Button>Resend Invoice</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Summary</h2>
        <hr
          role="presentation"
          className={clsx('mt-4', 'w-full border-t', 'border-zinc-950/10 dark:border-white/10')}
        />
        <dl
          className={clsx('grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6')}
        >
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Customer
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.customer.name}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Event
          </dt>

          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            <Link href={order.event.url} className="flex items-center gap-2">
              <Avatar src={order.event.thumbUrl} className="size-6" />
              <span>{order.event.name}</span>
            </Link>
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Amount
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            US{order.amount.usd}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Amount after exchange rate
          </dt>

          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            US{order.amount.usd} &rarr; CA{order.amount.cad}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Fee
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            CA{order.amount.fee}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Net
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            CA{order.amount.net}
          </dd>
        </dl>
      </div>
      <div className="mt-12">
        <h2 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Payment method</h2>
        <hr
          role="presentation"
          className={clsx('mt-4', 'w-full border-t', 'border-zinc-950/10 dark:border-white/10')}
        />
        <dl
          className={clsx('grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6')}
        >
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Transaction ID
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.payment.transactionId}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Card number
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            •••• {order.payment.card.number}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Card type
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.payment.card.type}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Card expiry
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.payment.card.expiry}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Owner
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.customer.name}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Email address
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.customer.email}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Address
          </dt>
          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            {order.customer.address}
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            Country
          </dt>

          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            <span className="inline-flex gap-3">
              <img src={order.customer.countryFlagUrl} alt={order.customer.country} />
              {order.customer.country}
            </span>
          </dd>
          <dt
            className={clsx(
              'col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5'
            )}
          >
            CVC
          </dt>

          <dd
            className={clsx(
              'pb-3 pt-1 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none'
            )}
          >
            <Badge color="lime">Passed successfully</Badge>
          </dd>
        </dl>
      </div>
    </>
  )
}
