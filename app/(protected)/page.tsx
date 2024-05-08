import { signOut } from '@/actions/signin-action';
import { ModeToggle } from '@/components/ModeToggle';
import SideBarNav from '@/components/dashbord/SideBarNav';
import { createClientSSR } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
	const supabase = createClientSSR();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt eligendi
				placeat debitis qui cupiditate! Rem nobis numquam ad tempora rerum iure
				temporibus culpa eveniet dolorum consequuntur aut dolores, expedita
				harum laboriosam? Facere nulla, consequatur optio accusamus eius
				corrupti, magni, at similique possimus fugit error facilis!
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt eligendi
				placeat debitis qui cupiditate! Rem nobis numquam ad tempora rerum iure
				temporibus culpa eveniet dolorum consequuntur aut dolores, expedita
				harum laboriosam? Facere nulla, consequatur optio accusamus eius
				corrupti, magni, at similique possimus fugit error facilis!
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa hic
				maiores vitae repellendus? Quisquam dignissimos quaerat iusto quidem
				voluptate consectetur, sed iure voluptatem itaque ea beatae aliquid
				numquam a repellat, sint nesciunt ratione sunt fuga aspernatur illum
				sapiente quas? Nulla corporis quos, suscipit alias labore et
				perferendis? Similique quibusdam reiciendis sit dolorum recusandae enim
				dolor, eius eos voluptates, ad dicta impedit quisquam quam corrupti
				consectetur aperiam atque sapiente, commodi distinctio deleniti odio?
				Non quos inventore, animi amet neque laudantium, ut exercitationem
				tempore commodi fugit suscipit nobis incidunt labore consectetur id
				laborum! Consequuntur possimus, illum sint aliquid consectetur
				recusandae dolorem explicabo doloribus soluta dolores nihil libero
				nesciunt, veniam neque blanditiis accusantium eligendi eaque. Illo,
				maiores tempore dolorum expedita doloremque quam deserunt eligendi
				animi, voluptatum doloribus odit quo, labore consequuntur perspiciatis
				libero dolores explicabo ab iure veniam laborum itaque. Odit voluptates
				similique suscipit. Hic nobis architecto mollitia, aut harum accusamus
				dolor illum culpa iusto suscipit veniam qui, optio ducimus nam laborum
				dignissimos doloremque illo. Illum corporis earum quod praesentium,
				consectetur doloribus temporibus optio animi, consequuntur, expedita
				fuga eaque alias. Rem, quod nostrum earum sit ea atque voluptatem,
				placeat numquam quaerat repudiandae non quos quibusdam labore nam porro
				reiciendis adipisci tenetur modi debitis reprehenderit quidem, ipsum
				sint. Temporibus odit error repellendus a accusantium soluta quas
				consectetur porro fugiat ducimus cupiditate voluptatum, eveniet
				asperiores rerum dignissimos vitae laudantium delectus adipisci sunt
				quos, blanditiis nemo numquam iste nesciunt. Aliquam architecto
				temporibus perferendis, autem nesciunt veniam amet sint cupiditate
				dignissimos eligendi qui aliquid quibusdam quos recusandae quasi itaque
				deleniti modi ea expedita nulla ex soluta distinctio provident.
				Laboriosam sequi quas debitis repellendus dignissimos. Iusto sint,
				beatae harum modi, quidem ullam veritatis perspiciatis qui dolorem
				possimus nobis officiis rem eveniet ipsa aliquid facilis! Magnam
				voluptate qui quibusdam in, consequatur earum ab et soluta
				necessitatibus minima, sapiente ipsam tenetur cum ea rem nobis dolor
				nulla voluptatem error provident temporibus delectus eius. Voluptates
				odit cupiditate nostrum praesentium dolorum cum libero quasi eligendi
				pariatur dolorem minima, aut, veritatis sed adipisci, eum provident
				nobis animi optio enim repellat. Quis, earum. Qui quaerat debitis quidem
				consectetur consequatur ea sequi sunt velit eaque, corrupti, et rem
				nostrum voluptate culpa quibusdam porro odio dolorum molestias expedita
				maiores quasi ab minus dolore. At ab maxime, ipsum quasi laudantium
				saepe quo temporibus esse harum eius ipsam sit commodi ex minus, maiores
				perspiciatis assumenda amet sapiente eligendi consequatur doloribus
				modi. Veritatis, eligendi ullam est sint aliquam quam possimus
				exercitationem quibusdam nisi dicta tenetur rem, consequatur officiis
				repudiandae? Velit sapiente cupiditate inventore aut expedita ullam
				blanditiis facere aperiam quod, non numquam! Aut nesciunt assumenda
				illum aspernatur hic, necessitatibus sint repellendus vel quas
				voluptates aliquid mollitia fuga repellat ipsum, voluptatem dolore
				provident laudantium iste sit suscipit accusantium dicta numquam?
				Adipisci temporibus eligendi ipsa dignissimos consectetur consequuntur
				cumque ratione quas omnis laudantium repellendus dolorum voluptates,
				soluta at, vitae veritatis delectus necessitatibus voluptatem mollitia
				deleniti ipsum dolores iste? Expedita, unde ex nam voluptatum
				accusantium sapiente aliquid vitae hic neque consectetur aspernatur
				eveniet blanditiis officiis harum asperiores cumque eos, quidem
				deleniti, iure dignissimos adipisci. Sint, nulla. Eos qui reiciendis
				voluptatem officia asperiores cupiditate! Quam repudiandae accusamus
				possimus ipsam soluta nostrum quae natus aperiam, molestiae accusantium
				officiis enim asperiores esse voluptates blanditiis nesciunt tempora
				delectus laudantium laboriosam ea non quaerat et. Rem laborum maiores,
				magni rerum exercitationem esse ipsam, voluptate iste aspernatur error,
				ex voluptas. Ea enim a cum quia dolore libero ex aliquam, odio ipsum?
				Possimus et perspiciatis eius illum eaque voluptates pariatur ullam
				dolorum fugit non nostrum, libero maxime exercitationem omnis harum
				voluptas dicta aliquam numquam repellendus facilis voluptatum error
				deserunt fuga. Magnam assumenda aperiam laborum aliquid fugit earum
				commodi, accusamus esse quod eveniet cumque natus dolorum praesentium
				quo rerum. Laborum vitae error magnam est mollitia in, minus sint ipsa
				expedita repellat commodi, odit facilis? Ipsa vero optio fuga quos?
				Dolor magni facere, officiis ipsa fugiat iusto eligendi iure molestiae
				numquam quo omnis asperiores nobis voluptatibus praesentium ipsum? Quos
				consequuntur impedit nisi totam ab eius amet ipsa aliquid? Dolorum
				facere rerum aspernatur voluptatem, perspiciatis dolore repudiandae
				quibusdam temporibus vel! Incidunt quis officiis quaerat, quae
				dignissimos ratione earum rem commodi ipsum id architecto aperiam ut
				voluptatibus maxime sit nobis quidem ducimus, natus non sunt delectus.
				Deleniti qui pariatur beatae omnis eaque repudiandae repellat, nostrum
				laboriosam aliquam in laudantium fugiat quidem cumque ratione blanditiis
				officia adipisci saepe perferendis incidunt voluptatibus facere porro
				numquam odit debitis! Ab est odit ea ipsa sed beatae iste perspiciatis
				debitis reiciendis et doloribus, voluptas, dolorem exercitationem quia!
				Excepturi at ratione, laudantium ex quidem perferendis! Dolores omnis
				quibusdam aliquam dolor perferendis nisi quod nam sint qui esse
				excepturi error totam ullam incidunt tenetur commodi culpa, quae quasi!
				Suscipit placeat quidem nisi at alias consectetur nihil consequatur
				perspiciatis accusamus cum corrupti, dicta vero necessitatibus fuga
				explicabo, totam hic, eius tempora iure optio consequuntur ab! Id,
				minima quia praesentium iusto blanditiis nam repellat vero sapiente
				labore aspernatur. Dolores eum exercitationem, quod aut, ipsa eligendi
				beatae expedita, voluptatem reprehenderit officiis ex. Alias expedita
				placeat magnam blanditiis libero. Totam, dolore! Deserunt fugit officiis
				sed corrupti pariatur accusamus omnis, vel tempora quasi, iste soluta
				natus corporis? Maiores error eius, labore obcaecati perferendis
				similique repudiandae dolore nihil enim dignissimos tenetur at
				distinctio quisquam ipsa corrupti aliquid impedit repellat in vel nam
				consequatur, placeat pariatur voluptatem a. Debitis quaerat quia
				corrupti quo consectetur eos cum sequi cumque labore velit non suscipit
				iure, nisi, qui ipsum vel maxime, dolorum laboriosam tenetur facilis
				accusantium necessitatibus? Nihil excepturi molestiae ab repellendus
				tenetur, iste dolor non veritatis est itaque ducimus assumenda quam
				beatae! Esse distinctio doloribus repudiandae repellendus voluptate,
				numquam sequi eveniet nobis aliquam recusandae nulla, aspernatur, rem
				eaque aliquid? Quo inventore maxime cum maiores quisquam, reiciendis
				mollitia nesciunt praesentium architecto ullam blanditiis nulla quae
				necessitatibus illo velit expedita repudiandae optio cumque eligendi in.
				Unde reprehenderit ut vitae laudantium error accusamus itaque ab impedit
				id nulla autem voluptas, alias odio architecto ipsum cupiditate
				obcaecati nesciunt? Omnis minus dignissimos ex veniam quas cumque eum
				numquam temporibus dolorem rem? Quas, eius? Et vero laborum quo,
				eligendi similique, perferendis, illum tempora necessitatibus mollitia
				at sed tenetur? Deserunt, fugit nesciunt ab hic dignissimos quidem
				sapiente beatae sit a ipsam odio officiis perspiciatis, ratione
				deleniti! Culpa, eveniet amet quae vero minus sunt, aperiam deserunt,
				aspernatur esse quidem praesentium vel eum quos? Quis id, placeat quae
				amet fugiat illum eveniet quidem eos tenetur vero atque laborum
				repudiandae inventore nemo aperiam iste quisquam sit pariatur
				laboriosam, corrupti necessitatibus? Fugiat, aliquid alias? Inventore
				minus doloribus quos officia! Sunt quod maxime quis saepe doloribus
				commodi, explicabo similique minus molestiae odit, velit aliquid eos ad
				nobis maiores corporis deleniti nihil ducimus quasi. Numquam explicabo
				sint cumque iure accusantium facilis hic corporis deserunt quaerat?
				Eaque sint pariatur, illum magni voluptatem voluptate, quis debitis
				veritatis culpa est cupiditate itaque repudiandae maxime. Perferendis
				facilis, hic cupiditate vitae magni voluptate voluptates voluptatem,
				excepturi doloribus ipsa quidem. Repellat a commodi illo officia
				laboriosam, consequatur voluptates repellendus reprehenderit veritatis
				fugiat sit suscipit ratione quo? Soluta ratione maiores ipsa assumenda
				cumque, blanditiis esse consectetur labore, quae recusandae sequi illum
				ullam, numquam fugit provident incidunt accusantium earum consequatur
				dolorem ducimus! Similique eos quae ad ratione fuga nam odio blanditiis
				quod temporibus. Sequi veniam error accusantium ipsum amet repellat
				omnis similique earum sapiente corrupti veritatis harum consequuntur
				minima assumenda nobis id officiis sed, labore tempore beatae aspernatur
				ex. Perspiciatis autem consectetur iure vitae provident molestias iusto
				modi incidunt aut optio. Ea tempora dolorem ad perspiciatis
				necessitatibus dolore iste molestias veritatis laboriosam ratione
				excepturi doloribus quidem et omnis blanditiis porro id animi amet
				libero dignissimos iusto dolorum, sed harum numquam. Dolorem est
				quisquam beatae iste corrupti temporibus tempore quidem libero mollitia
				eligendi dolores maiores incidunt delectus repellat officia, suscipit
				distinctio consequuntur. Aliquam enim amet fugiat quod quisquam delectus
				eveniet nisi velit odio doloribus, blanditiis laudantium inventore quo.
				Impedit iste labore maiores dolores ad quas, quam provident, natus neque
				similique est commodi architecto perferendis itaque esse quasi dolore
				quia nostrum earum? Consequuntur vitae rerum minima corrupti sequi
				suscipit, hic nostrum tenetur dicta? Nostrum ut vel quo, nobis quia,
				voluptates sed atque tempore eaque aspernatur accusantium nihil magnam
				ipsam debitis facere ab ad, commodi aperiam. Rem omnis magnam
				perspiciatis illum soluta reprehenderit totam eaque eligendi porro iure
				laudantium vel iste modi quam natus accusantium eius ratione voluptas,
				dicta perferendis esse est dolores unde. Temporibus aliquid fugiat
				exercitationem. Sint consequatur facilis, optio itaque laudantium
				voluptates labore voluptatum, odio aspernatur, laboriosam tempora
				repudiandae cupiditate. Autem voluptate dignissimos nam atque quaerat
				et. Iste dignissimos vel, veniam porro ab voluptates explicabo quo natus
				tempora ducimus amet necessitatibus magni nisi delectus odio in facere
				nostrum eveniet repudiandae voluptatibus fugit hic unde dolor. Ratione
				quas odit provident cumque sed vitae, magnam corrupti officiis nesciunt
				quod sequi, error sit placeat aut in consequuntur facilis quae ad
				praesentium a maiores ut nobis, non cupiditate. Repellat quisquam
				voluptates iure sequi expedita voluptatibus in non beatae impedit ut
				enim, adipisci porro veniam architecto, sed mollitia eveniet quaerat at!
				Sunt maxime, fugiat, unde autem facilis facere odio ratione iure nihil
				exercitationem saepe doloremque at non, laudantium sequi quaerat
				nostrum. Cumque fugit tempore dicta?
			</p>
		</>
	);
}
