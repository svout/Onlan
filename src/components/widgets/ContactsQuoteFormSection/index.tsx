'use client';

import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import LinesSvg from '@icons/Lines.svg';
import { Elements } from '@elements/index.ts';
import Title from '@/components/elements/Title';
import { CONTACTS_QUOTE_FORM } from '@/content/contacts';

const INPUT_WRAP_CLASS =
    'flex !h-[61px] min-h-[61px] items-center bg-onlan-white border-onlan-white';

const TEXTAREA_WRAP_CLASS = 'border-onlan-white bg-onlan-white';

export function ContactsQuoteFormSection() {
    const headingId = 'contacts-quote-form-heading';

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [fileName, setFileName] = useState('');

    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        // Підключення API / листа — за потреби
    }, []);

    const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.files?.[0]?.name ?? '');
    }, []);

    return (
        <section className="w-full pb-10 md:pb-14" aria-labelledby={headingId}>
            <div className="container mx-auto flex flex-col items-start px-4">
                <div className="relative isolate flex min-h-[440px] w-full flex-col items-start justify-center overflow-hidden rounded-2xl bg-onlan-blue md:min-h-[480px] lg:min-h-[720px]">
                    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                        <div className="absolute top-1/2 right-[-20%] -translate-y-1/2 sm:right-[-8%] md:right-[-6%] lg:right-[-15%]">
                            <Image
                                src={LinesSvg}
                                alt=""
                                width={1128}
                                height={798}
                                className="block h-[798px] w-[1128px] max-w-none shrink-0"
                                sizes="1128px"
                            />
                        </div>
                    </div>

                    <div className="relative z-10 w-full max-w-[900px] p-6 md:p-8 lg:p-10 xl:p-12">
                        <Title
                            id={headingId}
                            title={CONTACTS_QUOTE_FORM.title}
                            type="h2"
                            className="text-onlan-white w-full !text-[60px]"
                        />

                        <form className="mt-7 flex w-full max-w-[624px] flex-col gap-4" onSubmit={onSubmit} noValidate>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Elements.Input
                                    id="contacts-quote-name"
                                    name="name"
                                    type="text"
                                    label={CONTACTS_QUOTE_FORM.fields.name}
                                    labelClassName="!text-onlan-white"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    inputWrapClassName={INPUT_WRAP_CLASS}
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                    className="w-full"
                                />
                                <Elements.Input
                                    id="contacts-quote-company"
                                    name="company"
                                    type="text"
                                    label={CONTACTS_QUOTE_FORM.fields.company}
                                    labelClassName="!text-onlan-white"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    inputWrapClassName={INPUT_WRAP_CLASS}
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Elements.Input
                                    id="contacts-quote-email"
                                    name="email"
                                    type="email"
                                    label={CONTACTS_QUOTE_FORM.fields.email}
                                    labelClassName="!text-onlan-white"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    inputWrapClassName={INPUT_WRAP_CLASS}
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                    className="w-full"
                                />
                                <Elements.Input
                                    id="contacts-quote-phone"
                                    name="phone"
                                    type="tel"
                                    label={CONTACTS_QUOTE_FORM.fields.phone}
                                    labelClassName="!text-onlan-white"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    inputWrapClassName={INPUT_WRAP_CLASS}
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                    className="w-full"
                                />
                            </div>

                            <Elements.Textarea
                                id="contacts-quote-message"
                                name="message"
                                label={CONTACTS_QUOTE_FORM.fields.message}
                                labelClassName="!text-onlan-white"
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                textareaWrapClassName={TEXTAREA_WRAP_CLASS}
                                textareaClassName="min-h-[140px] resize-y"
                                className="w-full"
                            />

                            <div className="flex flex-col gap-2">
                                <label className="label relative inline-flex w-fit cursor-pointer !text-onlan-white hover:opacity-80">
                                    {CONTACTS_QUOTE_FORM.fields.file}
                                    <input
                                        type="file"
                                        name="attachment"
                                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                        onChange={onFileChange}
                                    />
                                </label>
                                {fileName && (
                                    <span className="max-w-full truncate text-sm text-onlan-white/75">
                                        {fileName}
                                    </span>
                                )}
                            </div>

                            <Elements.Button
                                type="submit"
                                variant="accent"
                                size="md"
                                className="mt-2 h-12 w-full justify-center underline font-semibold sm:w-auto sm:min-w-[240px] lg:h-14"
                            >
                                {CONTACTS_QUOTE_FORM.submit}
                            </Elements.Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
