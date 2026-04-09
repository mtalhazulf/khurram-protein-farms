import { getAllServices } from "@/lib/db";
import {
  createService,
  updateService,
  deleteService,
} from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div className="max-w-5xl">
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-kp-green-900 mb-1">Services</h1>
        <p className="text-sm text-kp-black/60">
          Create, edit and reorder the services shown on the homepage and
          services page.
        </p>
      </header>

      {/* Create new service */}
      <section className="bg-white rounded-2xl border border-kp-green-100 p-6 mb-10">
        <h2 className="font-serif text-xl text-kp-green-900 mb-5">
          Add a service
        </h2>
        <form action={createService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              name="title"
              required
              className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Icon name (lucide)
            </label>
            <input
              name="icon_name"
              placeholder="egg, truck, shield-check, award, leaf, package"
              className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Display order
            </label>
            <input
              name="display_order"
              type="number"
              defaultValue={0}
              className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm">
              <input name="is_active" type="checkbox" defaultChecked />
              Active
            </label>
          </div>
          <div className="md:col-span-2 pt-2">
            <SubmitButton pendingText="Adding…" className="px-6 py-2.5">
              Add service
            </SubmitButton>
          </div>
        </form>
      </section>

      {/* Existing services */}
      <section className="space-y-4">
        {services.length === 0 ? (
          <p className="text-center text-kp-black/60 py-10">
            No services yet.
          </p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-kp-green-100 p-6"
            >
              <form
                action={updateService.bind(null, service.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-kp-black/60 mb-1">
                      Title
                    </label>
                    <input
                      name="title"
                      defaultValue={service.title}
                      required
                      className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-kp-black/60 mb-1">
                      Icon name
                    </label>
                    <input
                      name="icon_name"
                      defaultValue={service.icon_name ?? ""}
                      className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-kp-black/60 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={service.description}
                      rows={3}
                      required
                      className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-kp-black/60 mb-1">
                      Display order
                    </label>
                    <input
                      name="display_order"
                      type="number"
                      defaultValue={service.display_order}
                      className="w-full rounded-lg border border-kp-green-100 bg-white px-4 py-2.5 text-sm focus:border-kp-green-700 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        name="is_active"
                        type="checkbox"
                        defaultChecked={service.is_active === 1}
                      />
                      Active
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SubmitButton pendingText="Saving…" className="px-5 py-2">
                    Save
                  </SubmitButton>
                </div>
              </form>
              <div className="mt-3 border-t border-kp-green-100 pt-3">
                <DeleteButton action={deleteService.bind(null, service.id)} />
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
