'use client'
import { authClient } from '@/lib/auth-client';
import {
    Table,
    Chip, Spinner,
} from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data: tokenData } = await authClient.token();
                const token = tokenData?.token;

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (!res.ok) {
                    setErrMsg(data.message || 'Failed to load transactions');
                } else {
                    setTransactions(data);
                }
            } catch (err) {
                setErrMsg('Could not reach the server');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const totalRevenue = transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    const isSuccess = (status) => status === 'succeeded' || status === 'paid' || status === 'complete';

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner label="Loading transactions..." />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Transactions</h1>
                <Chip
                    size="lg"
                    variant="flat"
                    color="secondary"
                    className="px-4 py-2 text-sm sm:text-base font-semibold"
                >
                    Total Revenue: ${totalRevenue.toFixed(2)}
                </Chip>
            </div>

            {errMsg && (
                <p className="text-sm text-red-500 dark:text-red-400">{errMsg}</p>
            )}

            {!errMsg && transactions.length === 0 ? (
                <div className="rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No transactions yet.</p>
                </div>
            ) : (
                <>
                    {/* Desktop / tablet: table (HeroUI v3 compound Table API) */}
                    <div className="hidden md:block rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm overflow-hidden">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content
                                    aria-label="Transactions table"
                                    className="min-w-full border-separate border-spacing-0"
                                >
                                    <Table.Header className="[&_th]:bg-indigo-50/80 dark:[&_th]:bg-white/[0.04] [&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:py-3.5 [&_th]:px-5 [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wide [&_th]:text-indigo-700 dark:[&_th]:text-indigo-300 [&_th]:text-left [&_th]:border-b [&_th]:border-indigo-200/60 dark:[&_th]:border-indigo-500/20">
                                        <Table.Column id="user_email" isRowHeader>USER EMAIL</Table.Column>
                                        <Table.Column id="transaction_id">TRANSACTION ID</Table.Column>
                                        <Table.Column id="amount">AMOUNT</Table.Column>
                                        <Table.Column id="status">STATUS</Table.Column>
                                        <Table.Column id="date">DATE</Table.Column>
                                    </Table.Header>
                                    <Table.Body
                                        items={transactions}
                                        className="[&_tr]:transition-colors [&_tr:hover]:bg-indigo-50/60 dark:[&_tr:hover]:bg-white/[0.04] [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-gray-100 dark:[&_tr:not(:last-child)_td]:border-white/5 [&_td]:py-3.5 [&_td]:px-5"
                                    >
                                        {(t) => (
                                            <Table.Row id={t._id}>
                                                <Table.Cell className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                                    {t.user_email}
                                                </Table.Cell>
                                                <Table.Cell className="text-sm font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {t.transaction_id}
                                                </Table.Cell>
                                                <Table.Cell className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                    ${Number(t.amount).toFixed(2)}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Chip
                                                        size="sm"
                                                        variant="flat"
                                                        color={isSuccess(t.payment_status) ? 'success' : 'warning'}
                                                        className="gap-1"
                                                    >
                                                        {isSuccess(t.payment_status)
                                                            ? <FaCircleCheck size={12} />
                                                            : <FaCircleXmark size={12} />}
                                                        {t.payment_status}
                                                    </Chip>
                                                </Table.Cell>
                                                <Table.Cell className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {formatDate(t.paid_at)}
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>

                    {/* Mobile: stacked cards (unchanged) */}
                    <div className="md:hidden space-y-3">
                        {transactions.map((t) => (
                            <div
                                key={t._id}
                                className="rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-4 space-y-3"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {t.user_email}
                                        </p>
                                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
                                            {t.transaction_id}
                                        </p>
                                    </div>
                                    <Chip
                                        size="sm"
                                        variant="flat"
                                        color={isSuccess(t.payment_status) ? 'success' : 'warning'}
                                        className="shrink-0 gap-1"
                                    >
                                        {isSuccess(t.payment_status)
                                            ? <FaCircleCheck size={12} />
                                            : <FaCircleXmark size={12} />}
                                        {t.payment_status}
                                    </Chip>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-3">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatDate(t.paid_at)}
                                    </span>
                                    <span className="text-base font-bold text-gray-900 dark:text-white">
                                        ${Number(t.amount).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TransactionsPage;