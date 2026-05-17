import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { loadDraft, useFormDraft } from './useFormDraft';

const KEY = 'test_lead_draft';
const FIELDS = ['name', 'phone', 'promo'] as const;

type Values = { name: string; phone: string; promo: string };

beforeEach(() => {
  window.sessionStorage.clear();
});

describe('loadDraft', () => {
  it('returns an empty object when nothing is stored', () => {
    expect(loadDraft(KEY)).toEqual({});
  });

  it('returns the stored string fields', () => {
    window.sessionStorage.setItem(KEY, JSON.stringify({ name: 'Anna', phone: '+48123456789' }));
    expect(loadDraft(KEY)).toEqual({ name: 'Anna', phone: '+48123456789' });
  });

  it('drops non-string values and survives malformed JSON', () => {
    window.sessionStorage.setItem(KEY, JSON.stringify({ name: 'Anna', count: 5, flag: true }));
    expect(loadDraft(KEY)).toEqual({ name: 'Anna' });

    window.sessionStorage.setItem(KEY, '{ not json');
    expect(loadDraft(KEY)).toEqual({});
  });
});

describe('useFormDraft', () => {
  it('mirrors watched fields into sessionStorage on change', () => {
    const { result } = renderHook(() => {
      const form = useForm<Values>({ defaultValues: { name: '', phone: '', promo: '' } });
      useFormDraft<Values>(KEY, form.watch, FIELDS);
      return form;
    });

    act(() => {
      result.current.setValue('name', 'Anna');
      result.current.setValue('phone', '+48883734171');
    });

    expect(loadDraft(KEY)).toEqual({ name: 'Anna', phone: '+48883734171' });
  });

  it('drops the draft once every cached field is empty again', () => {
    window.sessionStorage.setItem(KEY, JSON.stringify({ name: 'Anna' }));
    const { result } = renderHook(() => {
      const form = useForm<Values>({ defaultValues: { name: 'Anna', phone: '', promo: '' } });
      useFormDraft<Values>(KEY, form.watch, FIELDS);
      return form;
    });

    act(() => {
      result.current.setValue('name', '');
    });

    expect(window.sessionStorage.getItem(KEY)).toBeNull();
  });

  it('clearDraft removes the persisted draft', () => {
    window.sessionStorage.setItem(KEY, JSON.stringify({ name: 'Anna' }));
    const { result } = renderHook(() => {
      const form = useForm<Values>({ defaultValues: { name: 'Anna', phone: '', promo: '' } });
      return useFormDraft<Values>(KEY, form.watch, FIELDS);
    });

    act(() => {
      result.current.clearDraft();
    });

    expect(window.sessionStorage.getItem(KEY)).toBeNull();
  });
});
