import { Button } from "@/components/ui/button";
import { Category, Item } from "@/lib/types";
import { initializeFirestore, numberToRupiah } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore"; 


async function getCategory(id: string): Promise<Category> {
    const docRef = doc(
        initializeFirestore(),
        "registry/gbhVPR3h0N3tx6G7moo2/categories/", id + "" 
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const { name, image } = docSnap.data()
        return { name, image, id: docSnap.id }

    }else{
        return {
            name: "", 
            image: "", 
            id: ""
        }
    }

}

async function getItems(id: string): Promise<Item[]> {
    const allDocs: Item[] = [];
    const querySnapshot = await getDocs(
        collection(
            initializeFirestore(),
            `registry/gbhVPR3h0N3tx6G7moo2/categories/${id}/items`
        )
    );
    querySnapshot.forEach((doc) => {
        const { name, brand, amount, link, image } = doc.data()
        allDocs.push({ name, brand, amount, link, image, id: doc.id });
    });

    return allDocs
}

export default async function Home({
    params,
}: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const id = params.id
    const category = await getCategory(id)

    return (
        <main className="flex h-screen py-4 lg:py-10 mx-4 justify-center">
            <div className="h-full w-full bg-black grid lg:grid-cols-3 border-2 divide-y-2 lg:divide-y-0 lg:divide-x-2 shadow-light">

                <div className="bg-main px-4 py-5 lg:p-10 flex flex-col grow">
                    <div className="flex items-center justify-between">
                        <a href="/">
                            <Button size={"icon"}><ChevronLeft /></Button>

                        </a>
                        <h1 className="text-xl font-heading">{category.name}</h1>
                        <div className="">
                        </div>
                    </div>

                    <div className="hidden lg:block py-10 flex flex-col text-center items-center my-auto">

                        <div className="aspect-square m-10 bg-bg">

                        </div>
                        <div className="grow mt-20 m-4 flex flex-col gap-2">
                            <h5 className="text-md flex justify-between">
                                <span className="font-heading">Items Count: </span>
                                <span className="text-right">10 Items</span>
                            </h5>
                            <h5 className="text-md flex justify-between">
                                <span className="font-heading">Brand Count: </span>
                                <span className="text-right">5 Brands</span>
                            </h5>
                            <h5 className="text-md flex justify-between">
                                <span className="font-heading">Amount Total: </span>
                                <span className="text-right">Rp. 15.500.000</span>
                            </h5>
                        </div>

                    </div>
                </div>
                <div className="lg:col-span-2 bg-white h-full overflow-y-scroll">
                    <ItemList id={id} />
                </div>

            </div>
        </main>
    );
}

async function ItemList({ id }: { id: string }) {
    const items = await getItems(id)
    return (
        <ul className="grid">
            {
                items.map((item: Item,) => (
                    <ItemRow key={item.id} {...item} />
                ))
            }
        </ul>
    )
}

function ItemRow(props: Item) {
    return (
        <li className="border-b-2 border-border flex mr-1 lg:mr-2">
            <div className="h-16 lg:h-20 m-4 aspect-square bg-bg">
                <img src="" alt="" />
            </div>
            <div className="py-4 pr-4 sm:px-4 flex justify-between items-center grow gap-8 text-sm">
                <div className="lg:basis-1/3 flex flex-col lg:flex-row justify-between lg:justify-around lg:items-center h-full lg:grow">
                    <h1 className="lg:flex-1 lg:font-heading lg grow">{props.brand == "" ? "" : <span className="inline font-heading lg:hidden">{props.brand}, </span>} {props.name}</h1>
                    <h1 className="lg:hidden">Rp. {numberToRupiah(props.amount)}</h1>
                </div>
                <div className="lg:basis-2/3 flex flex-col lg:flex-row justify-around lg:justify-around lg:items-center h-full lg:grow">
                    <h1 className="lg:flex-1 text-sm hidden lg:inline">{props.brand}</h1>
                    <h1 className="lg:flex-1 hidden lg:block">Rp. {numberToRupiah(props.amount)}</h1>
                    <a className="lg:flex-1 text-center" href={props.link}>
                        <Button className="hidden lg:flex" variant={"noShadow"} >
                            <span>Shop Now</span>
                            <ChevronRight />
                        </Button>
                        <Button className="md:hidden" variant={"noShadow"} size={"icon"} >
                            <ChevronRight />
                        </Button>
                    </a>
                </div>
            </div>
        </li>
    )
}
