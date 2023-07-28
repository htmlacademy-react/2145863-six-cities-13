import type { AnchorHTMLAttributes } from 'react';
import {Link as RouterLink} from 'react-router-dom';

type ULinkProps = Pick<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'children' | 'className'
> & {
	href: string; // принудительно переопределяем string | undefined на string
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};


/**
 * ULink (Universal Link) - универсальная ссылка (обрабатывает внешний и внутренний роутинг)
 */
function ULink({children, href, ...props}: ULinkProps) {
	const isExternal = href?.startsWith('http');
	const isAnchor = href?.startsWith('#');

	if (isExternal) {
		return (
			<a href={href} rel="noreferrer noopener" target="_blank" {...props}>
				{children}
			</a>
		);
	}

	if (isAnchor) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}

	return (
		<RouterLink to={href} {...props}>
			{children}
		</RouterLink>
	);

}

export {ULink};
