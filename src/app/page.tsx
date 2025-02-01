import TransactionListItem from "@/features/transaction/components/TransactionListItem";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="col-span-1 md:col-span-3 bg-slate-50 rounded-sm p-2">
        1
      </div>
      <section className="bg-slate-50 rounded-sm p-4 flex flex-col gap-2">
        <h4 className="font-bold text-lg">New Transaction</h4>
        <input
          className="p-2 rounded-md border w-full text-right"
          type="number"
          step="0.01"
          autoFocus
        />
        <button className="bg-black rounded-md text-white p-2">
          New Transaction
        </button>
      </section>
      <section className="bg-slate-50 rounded-sm p-2 col-span-1 md:col-span-2">
        3
      </section>
      <section className="bg-slate-50 rounded-sm p-4 flex flex-col gap-2">
        <h4 className="font-bold text-lg">Recent Transactions</h4>
        <TransactionListItem />
        <TransactionListItem />
      </section>
    </div>
  );
}
