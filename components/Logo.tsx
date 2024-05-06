import React from 'react';

export default function Logo({
	className,
	...props
}: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			// className='text-foreground w-[26px] h-auto -rotate-45'
			className={className}
			{...props}
		>
			<path
				d='M11.7275 15.0455C10.1366 14.4546 8.50027 14.3637 7.00027 14.7728C5.95482 15.0455 4.95482 15.591 4.04573 16.2728L3.40935 16.8183L3.22754 17.0001L3.63663 17.3637C3.68208 17.3637 3.68209 17.4092 3.72754 17.4546C3.81845 17.5455 3.90937 17.591 4.04573 17.6819L4.31845 17.8637L4.59118 17.6364C4.63663 17.591 4.72754 17.5001 4.81845 17.4546C5.63663 16.7728 6.54572 16.3183 7.50026 16.091C8.72754 15.7728 10.0457 15.8183 11.3639 16.3183C12.4548 16.7274 14.6821 17.2274 17.3639 16.091L17.4548 16.0455L17.5912 15.9092C17.5912 15.8637 17.6366 15.8637 17.6821 15.8183C17.9094 15.5455 18.1366 15.2728 18.3185 14.9546L19.2275 13.5455L17.773 14.3637C15.6366 15.5455 13.6821 15.7728 11.7275 15.0455Z'
				fill='currentColor'
			/>
			<path
				d='M5.50027 10.1364C6.72754 9.81819 8.04572 9.86364 9.36391 10.3636C10.8185 10.9091 14.5457 11.6818 18.7275 7.9091L19.4094 7.22728L19.4548 7.18182L19.6366 7.00001L19.5457 6.77274C19.5003 6.59092 19.4094 6.36365 19.3184 6.13637L19.0912 5.5L18.6366 5.95455C18.5912 6.04545 18.5003 6.09091 18.4094 6.18182C16.4094 8.22727 13.3184 10.3182 9.77299 9.04546C8.18208 8.45455 6.54572 8.36364 5.04572 8.77273C3.59118 9.18182 2.31845 9.95455 1.13663 11.0455V11L0.454812 11.7273C0.454812 11.7727 0.409366 11.7727 0.363911 11.8182L0.227539 11.9546L0.272996 12.1364C0.318451 12.3636 0.409357 12.5909 0.454812 12.8182L0.727542 13.5455L1.18209 12.9546C1.22754 12.8636 1.31845 12.8182 1.3639 12.7273C2.31845 11.8636 3.63663 10.6364 5.50027 10.1364Z'
				fill='currentColor'
			/>
			<path
				d='M1.09092 9.31822C2.13637 8.22731 3.31818 7.54548 4.59091 7.18185C5.81818 6.86366 7.13637 6.90912 8.45455 7.40912C12.5455 8.90912 16.0909 6.45457 17.6364 5.13639L18.2273 4.54549L18.4545 4.36366L18.2727 4.09094C18.1364 3.95458 18.0455 3.77276 17.9091 3.59094L17.6364 3.22729L17.3182 3.54548C17.2727 3.59094 17.1818 3.68184 17.1364 3.7273C15.2273 5.54548 12.2727 7.40912 8.90909 6.1364C7.31818 5.54549 5.68182 5.45458 4.18182 5.86367C3.22728 6.13639 2.31818 6.59094 1.40909 7.18185L0.454545 7.95458C0.363636 8.04549 0.318182 8.09094 0.227273 8.18185L0.136372 8.27275V8.40912C0.0909174 8.72731 0.0909119 9.04549 0.0454573 9.31822L0 10.4546L0.772733 9.63639C0.863642 9.54548 0.954557 9.40912 1.09092 9.31822Z'
				fill='currentColor'
			/>
			<path
				d='M13.0458 18.1363L12.9549 18.4091L13.0458 18.1363C12.9094 18.0909 12.8185 18.0454 12.6822 17.9999C11.0913 17.409 9.45489 17.3181 7.95489 17.7272C7.63671 17.8181 7.31854 17.909 7.00036 18.0454L5.90943 18.5454L5.63672 18.6818L6.54581 19C6.81854 19.0909 7.09126 19.1818 7.36399 19.2727L7.50034 19.3181L7.63672 19.2727C7.77308 19.2272 7.90944 19.1363 8.0458 19.1363C8.13671 19.1363 8.22762 19.0909 8.31853 19.0454C9.40944 18.7727 10.5913 18.7727 11.864 19.1818C12.0003 19.2272 12.0913 19.2727 12.2276 19.3181L12.4549 19.409L12.5913 19.3636C12.9094 19.2727 13.2731 19.1818 13.5458 19.0454L14.8185 18.5909L13.5003 18.2727C13.364 18.2272 13.1822 18.1818 13.0458 18.1363Z'
				fill='currentColor'
			/>
			<path
				d='M20 8.72729L19.3182 9.40911C19.2273 9.50002 19.1364 9.59093 19.0455 9.68184C17.1818 11.4546 14.1818 13.3637 10.8182 12.0909C9.22727 11.5 7.59091 11.4091 6.09091 11.8182C4.68182 12.2273 3.40908 12.9546 2.27272 14.0455L1.68182 14.6818L1.5 14.9091L1.68182 15.1818C1.81818 15.3637 1.90909 15.5 2 15.6818L2.27272 16.0909L2.59091 15.6818C2.63636 15.6364 2.72727 15.5455 2.77272 15.5C3.86363 14.3182 5.04545 13.5909 6.40909 13.2273C7.63636 12.9091 8.95454 12.9546 10.2727 13.4546C11.4091 13.8637 12.5909 14 13.7727 13.8637C15.8636 13.6364 17.9545 12.4546 19.5 11.1364C19.5909 11.0455 19.6818 11 19.7727 10.9091L19.9091 10.7727V10.6364C19.9091 10.3637 19.9545 10.0455 19.9545 9.77276L20 8.72729Z'
				fill='currentColor'
			/>
			<path
				d='M2.727 4.54551L2.59064 4.27278L2.727 4.54551C2.99973 4.40915 3.31792 4.31823 3.59065 4.22733C4.81792 3.90914 6.1361 3.9546 7.45428 4.4546C8.31792 4.77278 9.18155 4.90914 10.1361 4.90914C12.0452 4.90914 13.9543 4.22733 15.727 2.90915L16.4088 2.36369L16.6361 2.18187L16.227 1.86368C16.0906 1.72732 15.9088 1.59096 15.727 1.50005L15.4543 1.31824L15.227 1.50005C15.1361 1.54551 15.0906 1.63641 14.9997 1.68187C12.5906 3.50005 10.1816 4.00006 7.90883 3.13642C6.27247 2.54551 4.63609 2.40915 2.99973 2.90915C2.86337 2.9546 2.727 3.00005 2.54519 3.0455L2.45428 3.09096L2.31791 3.22732C2.31791 3.27277 2.27247 3.27278 2.22701 3.31823C2.04519 3.59096 1.81791 3.81824 1.63609 4.09097L0.772461 5.40915L2.18155 4.68187C2.40883 4.68187 2.59064 4.59097 2.727 4.54551Z'
				fill='currentColor'
			/>
			<path
				d='M6.45455 1.45454L6.59091 1.49999C7.18182 1.72727 8.09092 1.95454 9.22728 1.95454C10.4091 1.95454 11.5455 1.68181 12.6818 1.22726L14.0909 0.545446L13.1364 0.227273C12.8636 0.136364 12.5909 0.0454545 12.2727 0H12.1364L12 0.0454434C11.8636 0.090898 11.7273 0.181818 11.5909 0.227273C10.2273 0.727273 8.86364 0.818182 7.54546 0.454545C7.40909 0.409091 7.27273 0.363628 7.13637 0.318173L7.00001 0.272716L6.86364 0.318173C6.59091 0.409083 6.31819 0.499997 6.04546 0.636361L5 1.09091L6.09092 1.40908C6.18183 1.36363 6.31819 1.40908 6.45455 1.45454Z'
				fill='currentColor'
			/>
		</svg>
	);
}