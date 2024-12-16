import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DropdownButton, DropdownItem } from '@/components/dropdown'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { getEvents } from '@/data'
import * as Headless from '@headlessui/react'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

export const metadata = {
  title: 'Events',
}

export default async function Events() {
  let events = await getEvents()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">Events</h1>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <span
                data-slot="control"
                className={clsx(
                  'relative isolate block',
                  '[&_input]:has-[[data-slot=icon]:first-child]:pl-10 [&_input]:has-[[data-slot=icon]:last-child]:pr-10 sm:[&_input]:has-[[data-slot=icon]:first-child]:pl-8 sm:[&_input]:has-[[data-slot=icon]:last-child]:pr-8',
                  '[&>[data-slot=icon]]:pointer-events-none [&>[data-slot=icon]]:absolute [&>[data-slot=icon]]:top-3 [&>[data-slot=icon]]:z-10 [&>[data-slot=icon]]:size-5 sm:[&>[data-slot=icon]]:top-2.5 sm:[&>[data-slot=icon]]:size-4',
                  '[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5',
                  '[&>[data-slot=icon]]:text-zinc-500 dark:[&>[data-slot=icon]]:text-zinc-400'
                )}
              >
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search events&hellip;" />
              </span>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create event</Button>
      </div>
      <ul className="mt-10">
        {events.map((event, index) => (
          <>
            <li key={event.id}>
              <hr
                role="presentation"
                className={clsx(
                  'w-full border-t',
                  index > 0 && 'border-zinc-950/5 dark:border-white/5',
                  !index > 0 && 'border-zinc-950/10 dark:border-white/10'
                )}
              />
              <div className="flex items-center justify-between">
                <div key={event.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <Link href={event.url} aria-hidden="true">
                      <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl} alt="" />
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={event.url}>{event.name}</Link>
                    </div>
                    <div className="text-xs/6 text-zinc-500">
                      {event.date} at {event.time} <span aria-hidden="true">·</span> {event.location}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {event.ticketsSold}/{event.ticketsAvailable} tickets sold
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="max-sm:hidden" color={event.status === 'On Sale' ? 'lime' : 'zinc'}>
                    {event.status}
                  </Badge>
                  <Headless.Menu>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <Headless.MenuItems
                      transition
                      anchor={'bottom end'}
                      className={clsx(
                        // Anchor positioning
                        '[--anchor-gap:theme(spacing.2)] [--anchor-padding:theme(spacing.1)] data-[anchor~=start]:[--anchor-offset:-6px] data-[anchor~=end]:[--anchor-offset:6px] sm:data-[anchor~=start]:[--anchor-offset:-4px] sm:data-[anchor~=end]:[--anchor-offset:4px]',
                        // Base styles
                        'isolate w-max rounded-xl p-1',
                        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
                        'outline outline-1 outline-transparent focus:outline-none',
                        // Handle scrolling when menu won't fit in viewport
                        'overflow-y-auto',
                        // Popover background
                        'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
                        // Shadows
                        'shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10',
                        // Define grid at the menu level if subgrid is supported
                        'supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]',
                        // Transitions
                        'transition data-[closed]:data-[leave]:opacity-0 data-[leave]:duration-100 data-[leave]:ease-in'
                      )}
                    >
                      <DropdownItem href={event.url}>View</DropdownItem>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem>Delete</DropdownItem>
                    </Headless.MenuItems>
                  </Headless.Menu>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  )
}
