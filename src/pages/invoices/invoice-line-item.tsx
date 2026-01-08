import { Controller } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  UseFormGetValues,
  UseFormSetValue,
  FieldArrayWithId,
} from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";
import UploadImageDialog from "@/components/invoice/upload-image-dialog";
import ItemListDialog from "@/components/invoice/item-list-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { InvoiceFormValues, LineItem } from "./invoice-form";

type FieldType = FieldArrayWithId<InvoiceFormValues, "lineItems", "fieldId">;

type Props = {
  field: FieldType;
  index: number;
  item: LineItem;
  control: Control<InvoiceFormValues>;
  register: UseFormRegister<InvoiceFormValues>;
  getValues: UseFormGetValues<InvoiceFormValues>;
  setValue: UseFormSetValue<InvoiceFormValues>;
  remove: (index: number) => void;
};

export default function InvoiceLineItem({
  field,
  index,
  item,
  control,
  register,
  getValues,
  setValue,
  remove,
}: Props) {
  const [notesOpen, setNotesOpen] = useState(false);

  const toggleNotes = () => setNotesOpen((s) => !s);

  const removeImage = (imageIndex: number) => {
    const items = getValues("lineItems") || [];
    const images = items[index]?.images || [];
    const newImages = images.filter((_, i) => i !== imageIndex);
    setValue(`lineItems.${index}.images`, newImages);
  };

  return (
    <div
      key={field.fieldId || field.id}
      className="relative border rounded-lg p-2 pl-6 space-y-3 overflow-x-auto"
    >
      <button
        onClick={() => remove(index)}
        className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow"
        aria-label="remove-item"
      >
        −
      </button>
      <div className="grid grid-cols-12 divide-x divide-gray-200 items-center min-w-[720px]">
        <div className="col-span-3 px-2 py-0">
          <div className="flex items-center gap-3">
            {item?.description ? (
              <span className="text-sm text-gray-900 font-medium">
                {item.description}
              </span>
            ) : (
              <Input
                {...register(`lineItems.${index}.description` as const)}
                placeholder="Description"
              />
            )}

            <ItemListDialog
              initialItems={item?.items || []}
              onChange={(items: string[]) =>
                setValue(`lineItems.${index}.items`, items)
              }
            >
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1 whitespace-nowrap"
              >
                <span className="text-base">☰</span> Item list
              </button>
            </ItemListDialog>
          </div>

          {(item?.items || []).length > 0 && (
            <div className="mt-2 flex items-center gap-2 flex-wrap overflow-x-auto">
              {(item.items || []).map((it: string, i: number) => (
                <div key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">
                  {it}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2 pl-5 py-1">
          {item?.rate ? (
            <span className="text-sm text-gray-900">
              $
              {(item.rate || 0).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          ) : (
            <Input
              type="number"
              {...register(`lineItems.${index}.rate` as const, {
                valueAsNumber: true,
              })}
              placeholder="0.00"
            />
          )}
        </div>

        <div className="col-span-2 pl-5 py-1">
          <Controller
            control={control}
            name={`lineItems.${index}.markup` as const}
            defaultValue={field.markup}
            render={({ field: selField }) => (
              <Select value={selField.value} onValueChange={selField.onChange}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Markup">Markup</SelectItem>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="col-span-2 pl-5 py-1">
          <span className="text-sm text-gray-900">{item?.quantity || 1}</span>
        </div>

        <div className="col-span-2 pl-5 py-1">
          <Controller
            control={control}
            name={`lineItems.${index}.tax` as const}
            defaultValue={field.tax}
            render={({ field: taxField }) => (
              <button
                type="button"
                onClick={() => taxField.onChange(!taxField.value)}
                className="text-sm text-blue-600 hover:underline"
              >
                Tax
              </button>
            )}
          />
        </div>

        <div className="col-span-1 pl-5 py-1 flex items-center justify-end">
          <span className="text-sm font-medium text-gray-900">
            $
            {((item?.rate || 0) * (item?.quantity || 0)).toLocaleString(
              "en-US",
              { minimumFractionDigits: 2 }
            )}
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-200">
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel
              onClick={toggleNotes}
              className="text-sm text-gray-600 cursor-pointer"
            >
              Notes
            </FieldLabel>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={toggleNotes}
            >
              {notesOpen ? "Hide" : "Add"}
            </button>
          </div>

          {notesOpen && (
            <FieldContent>
              <Textarea
                {...register(`lineItems.${index}.notes` as const)}
                placeholder="Add notes..."
                className="resize-none mt-2"
                rows={2}
              />
            </FieldContent>
          )}
        </Field>
      </div>

      <div className="flex items-center gap-2 flex-wrap overflow-x-auto">
        <UploadImageDialog
          onUpload={(files: File[]) => {
            const names = files.map((f) => f.name);
            const items = getValues("lineItems") || [];
            const images = items[index]?.images || [];
            const combined = [...images, ...names].slice(0, 4);
            setValue(`lineItems.${index}.images`, combined);
          }}
        >
          <Button variant="outline" size="sm" className="text-blue-600">
            Upload photos
            <span className="ml-2 text-gray-400 text-xs">(Max 4)</span>
          </Button>
        </UploadImageDialog>

        {(item?.images || []).map((image: string, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
          >
            <span className="text-sm">{image}</span>
            <button
              onClick={() => removeImage(idx)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
