import { accessPage } from "@/actions/permissions";
import { ItemForm } from "../_components/form";

export default async function CreateItemPage() {

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Créer un article</h1>
        <p className="text-muted-foreground">Ajoutez un nouvel article à votre inventaire</p>
      </div>
      <ItemForm mode="create" />
    </div>
  )
}
