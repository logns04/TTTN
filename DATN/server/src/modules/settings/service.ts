import { prisma } from '../../config/prisma';
import { SETTING_DEFS } from './keys';
import type { UpdateSettingsInput } from './schema';

export const getPublic = async (): Promise<Record<string, string>> => {
  const rows = await prisma.setting.findMany({ select: { key: true, value: true } });
  const stored = new Map(rows.map((row) => [row.key, row.value]));

  return Object.fromEntries(
    SETTING_DEFS.map((definition) => [
      definition.key,
      stored.get(definition.key) ?? definition.value,
    ]),
  );
};

export const getForAdmin = async () => {
  const rows = await prisma.setting.findMany({ select: { key: true, value: true } });
  const stored = new Map(rows.map((row) => [row.key, row.value]));

  return SETTING_DEFS.map((definition) => ({
    key: definition.key,
    label: definition.label,
    type: definition.type,
    value: stored.get(definition.key) ?? definition.value,
  }));
};

export const updateMany = async (input: UpdateSettingsInput) => {
  await prisma.$transaction(
    Object.entries(input).map(([key, value]) => {
      const definition = SETTING_DEFS.find((item) => item.key === key);
      return prisma.setting.upsert({
        where: { key },
        create: { key, value, type: definition?.type },
        update: { value },
      });
    }),
  );

  return getForAdmin();
};
