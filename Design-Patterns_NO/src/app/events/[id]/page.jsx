import { Stat } from '@/app/page'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Link } from '@/components/link'
import { TableCell, TableHeader, TableRow } from '@/components/table'
import { getEvent, getEventOrders } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  let event = await getEvent(params.id)

  return {
    title: event?.name,
  }
}

export default async function Event({ params }) {
  let event = await getEvent(params.id)
  let orders = await getEventOrders(params.id)

  if (!event) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Events
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-32 shrink-0">
            <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt="" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">{event.name}</h1>
              <Badge color={event.status === 'On Sale' ? 'lime' : 'zinc'}>{event.status}</Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Edit</Button>
          <Button>View</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Total revenue" value={event.totalRevenue} change={event.totalRevenueChange} />
        <Stat
          title="Tickets sold"
          value={`${event.ticketsSold}/${event.ticketsAvailable}`}
          change={event.ticketsSoldChange}
        />
        <Stat title="Pageviews" value={event.pageViews} change={event.pageViewsChange} />
      </div>
      <h2 className="mt-12 text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">Recent orders</h2>
      <div className="flow-root">
        <div
          className={clsx(
            'mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]',
            '-mx-[--gutter] overflow-x-auto whitespace-nowrap'
          )}
        >
          <div className={clsx('inline-block min-w-full align-middle', 'sm:px-[--gutter]')}>
            <table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
              <thead className={clsx('text-zinc-500 dark:text-zinc-400')}>
                <TableRow>
                  <TableHeader>Order number</TableHeader>
                  <TableHeader>Purchase date</TableHeader>
                  <TableHeader>Customer</TableHeader>
                  <TableHeader className="text-right">Amount</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className="text-zinc-500">{order.date}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell className="text-right">US{order.amount.usd}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
