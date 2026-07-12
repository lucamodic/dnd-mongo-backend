import { ISubclass, ISubclassResource } from "../db/models/Subclass";

const emptySlots = () => [0, 0, 0, 0, 0, 0, 0, 0, 0];

function pushEmptyLevel(cls: Record<string, any>, level: number) {
  const created = {
    level,
    features: [],
    spellSlots: [],
    cantripsKnown: 0,
    spellsKnown: 0,
    resources: [],
  };
  cls.progression = [...(cls.progression || []), created].sort((a: any, b: any) => a.level - b.level);
  return created;
}

function overrideOrAppendByKey(base: ISubclassResource[] = [], extra: ISubclassResource[] = []) {
  const byKey = new Map(base.map((resource) => [resource.key, resource]));
  for (const resource of extra) byKey.set(resource.key, resource);
  return Array.from(byKey.values());
}

export function mergeSubclassIntoClass(
  cls: Record<string, any>,
  subclass: ISubclass | null,
  level: number,
  spellListClassId?: string
): Record<string, any> {
  if (!subclass) return cls;

  for (const subclassLevel of subclass.progression || []) {
    if (subclassLevel.level > level) continue;
    const target =
      (cls.progression || []).find((progressionLevel: any) => progressionLevel.level === subclassLevel.level) ||
      pushEmptyLevel(cls, subclassLevel.level);

    target.features = [...(target.features || []), ...(subclassLevel.features || [])];
    if (subclassLevel.resources?.length) {
      target.resources = overrideOrAppendByKey(target.resources || [], subclassLevel.resources);
    }

    if (subclass.spellcasting) {
      if (subclassLevel.spellSlots) target.spellSlots = subclassLevel.spellSlots;
      if (subclassLevel.cantripsKnown != null) target.cantripsKnown = subclassLevel.cantripsKnown;
      if (subclassLevel.spellsKnown != null) target.spellsKnown = subclassLevel.spellsKnown;
    }
  }

  if (subclass.spellcasting && !cls.spellcasting) {
    cls.spellcasting = true;
    cls.spellcastingAbility = subclass.spellcastingAbility || "";
    cls.spellListClassId = spellListClassId || "";
  }

  return cls;
}

export const subclassSpellSlots = {
  none: emptySlots,
};
