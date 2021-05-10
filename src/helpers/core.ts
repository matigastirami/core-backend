import Hash from "./hash";

export class CoreBackendGlobal {

    public hash: Hash;

    public register(mod: string, constructed: any) {
		if (process.env.NODE_ENV == 'development' && this[mod]) {
			console.info(' ==> Remove module', mod);
			delete this[mod];
		}

		console.info(' ==> Updating module', mod);

		this[mod] = constructed;
	}
}

globalThis.core = new CoreBackendGlobal();