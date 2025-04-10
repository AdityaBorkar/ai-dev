import { getConfig } from "@/algorithm/config";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const ConfigAtom = atom(async (get) => {
	const config = await getConfig();
	return config;
});

export const AsyncConfigAtom = loadable(ConfigAtom);

// Does not need to be wrapped by a <Suspense> element
// const Component = () => {
//   const [value] = useAtom(loadableAtom)
//   if (value.state === 'hasError') return <Text>{value.error}</Text>
//   if (value.state === 'loading') {
//     return <Text>Loading...</Text>
//   }
//   console.log(value.data) // Results of the Promise
//   return <Text>Value: {value.data}</Text>
// }
