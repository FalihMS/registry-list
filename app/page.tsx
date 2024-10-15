import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

async function getCategories(): Promise<Category[]> {
  const { data } = await (await fetch(`${process.env.API_SITE}/api/categories`, { next: { revalidate: 3600 } })).json()
  return data
}

export default async function Homepage() {
  const categories = await getCategories()
  console.log(categories)

  return (
    <main className="flex h-screen py-4 lg:py-10 mx-4 justify-center">
      <MainLayout>
        <HeaderLayout>
          <HeaderImage />
          <h1 className="text-xl sm:text-4xl text-center font-heading">Baby Registry List</h1>
        </HeaderLayout>
        <ContentLayout>
          <CategoryList data={categories} />
        </ContentLayout>
      </MainLayout>
    </main>
  )
}

function MainLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="h-full w-full bg-black grid md:grid-cols-2 lg:grid-cols-3 border-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 shadow-light overflow-y-scroll">
      {children}
    </div>
  )
}

function HeaderLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="bg-main px-10 py-5 sm:py-10 flex flex-col gap-5 sm:gap-10 sm:justify-center">
      {children}
    </div>
  )
}

function ContentLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="lg:col-span-2 bg-white p-10 sm:h-full sm:overflow-y-scroll">
      {children}
    </div>
  )
}

function HeaderImage() {
  return (
    <div className="w-full aspect-video lg:aspect-square px-8 py-4">
      <img
        className="aspect-square object-cover border-2 border-border"
        src="https://images.unsplash.com/photo-1498159551354-e44d84854c2f?q=80&w=2808&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>

  )
}

async function CategoryList({ data }: { data: Category[] }) {
  return (
    <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {
        data.map((category: Category) => (
          <CategoryCard key={category.id} {...category} />
        ))
      }
    </ul>
  )
}

function CategoryCard(category: Category) {
  return (
    <li className="border-2 border-border shadow-light flex flex-col">
      <Card>
        <CardHeader>
          <img className="w-full aspect-square object-cover border-2 border-border" src="https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        </CardHeader>
        <CardContent className="text-center">
          <h1 className="font-heading text-lg sm:text-xl text-white">{category.name}</h1>
        </CardContent>
        <CardFooter>
          <a className="grow" href={`/item/${category.id}`}>
            <Button className="w-full" size={"sm"} >
              View Item
            </Button>
          </a>
        </CardFooter>
      </Card>
    </li>
  )
}
